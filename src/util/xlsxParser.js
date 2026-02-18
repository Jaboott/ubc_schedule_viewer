import * as XLSX from 'xlsx';

/**
 * Read the xlsx file 
 * @param {File} file - The xlsx file the user inputed through form
 * @returns {object} - JSON representation of both term of school year
 */

const indexMapping = {
    course: 0,
    meeting_patterns: 0,
    instructor: 0,
    instructional_format: 0,
    start_date: 0,
    end_date: 0,
}

export function readFile(file) {
    const startSections = [
        "My Enrolled Courses",
        "Courses"
    ]

    const endSections = [
        "My Dropped/Withdrawn Courses",
        "My Waitlisted Courses",
        "My Completed Courses",
        "Enrolled Credits",
        undefined
    ]

    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const workbook = XLSX.read(arrayBuffer);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            // Manually set !ref to a large enough range
            worksheet['!ref'] = 'A1:EZ500';
            const scheduleJson = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            let headerIndex = 0;
            let startIndex = 0;
            let endIndex = scheduleJson.length;

            // Slice the array so that it only contains the enrolled courses content
            for (let i = 0; i < scheduleJson.length; i++) {
                if (startSections.includes(scheduleJson[i][0])) {
                    headerIndex = i + 2;
                    startIndex = i + 3;
                }
                // Start the endIndex check after startIndex is set
                if (startIndex !== 0 && i > startIndex && endSections.includes(scheduleJson[i][0])) {
                    endIndex = i;
                    break;
                }
            }
            const header = scheduleJson[headerIndex];
            indexMapping.course = header.indexOf("Section");
            indexMapping.meeting_patterns = header.indexOf("Meeting Patterns");
            indexMapping.instructor = header.indexOf("Instructor");
            indexMapping.instructional_format = header.indexOf("Instructional Format");
            indexMapping.start_date = header.indexOf("Start Date");
            indexMapping.end_date = header.indexOf("End Date");
            const coursesJson = scheduleJson.slice(startIndex, endIndex);
            // console.table(coursesJson);
            resolve(parseJson(coursesJson));
        };

        fileReader.onerror = function (event) {
            reject(event.target.error);
        }

        fileReader.readAsArrayBuffer(file);
    });
}

/**
 * Parses the JSON representation of courses into list of course JSON organized by weekday
 * @param {object} coursesJson - The JSON representation of the xlsx file
 * @returns {object} - JSON representation of both term of school year
 */
function parseJson(coursesJson) {
    const schedule = {
        "term_1": [],
        "term_2": [],
        "summer": []
    };

    // Assigning each unique course to a color
    const map = new Map();
    const colors = ["#DAB4E0", "#B7DFED", "#E0B4B4", "#B4B4E0", "#E8DFD3", "#C3E8B8"];
    const colorIndex = { "term_1": 0, "term_2": 0, "summer": 0};

    for (const courseJson of coursesJson) {
        const course = parseCourse(courseJson);
        const termKey = course.term === 1? "term_1": course.term === 2? "term_2" : "summer";

        if (!map.has(course.course.course_code)) {
            map.set(course.course.course_code, colors[colorIndex[termKey]++]);
        }
        course.color = map.get(course.course.course_code);
        schedule[termKey].push(course);

    }

    localStorage.setItem("schedule", JSON.stringify(schedule));
    console.table(schedule);
    return schedule;
}

/**
 * Parse the JSON representation of a single course for specific fields
 * @param {object} courseJson - The raw JSON representation of a course
 * @returns {object} - A single JSON course with needed fields
 */
function parseCourse(courseJson) {
    return {
        term: courseJson[0].indexOf('Term') !== -1? Number(courseJson[0].charAt(courseJson[0].indexOf('Term') + 5)) : "summer",
        course: getCourseInfo(courseJson[indexMapping.course].split('-')),
        meeting_patterns: getMeetingPatterns(courseJson[indexMapping.meeting_patterns]),
        additional: getAdditional(courseJson),
        course_duration: {
            start: courseJson[indexMapping.start_date],
            end: courseJson[indexMapping.end_date]
        },
    };
}

/**
 * Retrieve the prof of a course and the instructional format
 * @param {object} courseJson - The JSON containing the course information
 * @returns {object} - A JSON representing prof and instructional format
 */
function getAdditional(courseJson) {
    let prof = courseJson[indexMapping.instructor];

    // When prof is not set
    if (!prof) {
        prof = "Prof TBD";
    }

    const instructionalFormat = courseJson[indexMapping.instructional_format];

    return {
        'prof': prof,
        'instructional_format': instructionalFormat
    };
}

/**
 * Parse the String for meeting pattern and split it into more specific fields
 * @param {string} meetingPatterns - The string containing the meeting pattern
 * @returns {object} - A JSON representing meeting patterns with specific fields
 */
function getMeetingPatterns(meetingPatterns) {
    if (!meetingPatterns) {
        return {
            'start_time': null,
            'end_time': null,
            'course_day': null,
            'course_location': null
        }
    }

    let meetingPatternsList = []
    meetingPatterns = meetingPatterns.split('\n').filter(Boolean)

    for (let meetingPattern of meetingPatterns) {
        meetingPattern = meetingPattern.split(' | ')
        meetingPatternsList.push(getMeetingPattern(meetingPattern))
    }

    return meetingPatternsList
}

function getMeetingPattern(meetingPattern) {
    const courseDay = meetingPattern[1].split(' ');
    let courseLocation = meetingPattern[4];

    // When location of course is not set
    if (!courseLocation) {
        courseLocation = "Location TBD";
    }

    // Sometimes meeting pattern is displayed twice due to break
    if (courseLocation.includes("\n\n")) {
        courseLocation = courseLocation.split("\n\n")[0];
    }

    let [start_time, end_time] = meetingPattern[2].split(' - ');

    return {
        'start_time': convertTime(start_time),
        'end_time': convertTime(end_time),
        'course_day': courseDay,
        'course_location': courseLocation
    };
}

/**
 * Converts date and time to 24 hr decimal time
 * @param {string} timeData - A string representing time
 * @returns {number} - Number representation of a time
 */
function convertTime(timeData) {
    timeData = timeData.replaceAll('|', '').replaceAll('.', '');

    const [time, modifier] = timeData.split(' ');
    let [hours, minutes] = time.split(':');

    hours = Number(hours);
    minutes = Number(minutes);

    // Edge case of 12am and 12pm
    if (modifier === 'pm' && hours !== 12) {
        hours += 12;
    } else if (modifier === 'am' && hours === 12) {
        hours = 0;
    }

    const decimalHours = hours + minutes / 60;

    return decimalHours;
}

/**
 * Parses the string into JSON of course info
 * @param {string} courseInfo - String representation of course information
 * @returns {object} - A JSON object with course information fields
 */
function getCourseInfo(courseInfo) {
    const courseCode = courseInfo[0].replace('_V', '');
    const courseSection = courseInfo[1].trim();
    const courseTitle = courseInfo[2].substring(1);

    return {
        'course_code': courseCode,
        'course_section': courseSection,
        'course_title': courseTitle
    };
}

export default readFile;