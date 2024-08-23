import * as XLSX from 'xlsx';

/**
 * Read the xlsx file 
 * @param {File} file - The xlsx file the user inputed through form
 * @returns {object} - JSON representation of both term of school year
 */
export function readFile(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const workbook = XLSX.read(arrayBuffer);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            // Skip the first 3 line
            const scheduleJson = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            let startIndex = 0;
            let endIndex = scheduleJson.length;

            // Slice the array so that it only contains the array
            for (let i = 0; i < scheduleJson.length; i++) {
                if (scheduleJson[i][0] == "My Enrolled Courses") {
                    startIndex = i + 3;
                }
                if (scheduleJson[i][0] == "My Dropped/Withdrawn Courses") {
                    endIndex = i;
                    break;
                }
            }

            const coursesJson = scheduleJson.slice(startIndex, endIndex);
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
    let term1Courses = [];
    let term2Courses = [];
    const map = new Map();
    const colors = ["#DAB4E0", "#B7DFED", "#E0B4B4", "#B4B4E0", "#E8DFD3", "#C3E8B8"];
    let unique1 = 0;
    let unique2 = 0;

    for (const courseJson of coursesJson) {
        const course = parseCourse(courseJson);

        // Assign each unique course a color
        if (!map.has(course["course"].course_code)) {
            map.set(course["course"].course_code, colors[course.term == 1 ? unique1++ : unique2++]);
        }
        course.color = map.get(course["course"].course_code);

        // Seperate the list into two terms
        if (course.term == 1) {
            term1Courses.push(course);
        } else {
            term2Courses.push(course);
        }
    }

    return {
        'term_1': term1Courses,
        'term_2': term2Courses
    };
}

/**
 * Parse the JSON representation of a single course for specific fields
 * @param {object} courseJson - The raw JSON representation of a course
 * @returns {object} - A single JSON course with needed fields
 */
function parseCourse(courseJson) {
    return {
        'term': Number(courseJson[0].charAt(courseJson[0].indexOf('Term') + 5)),
        'course': getCourseInfo(courseJson[4].split('-')),
        'meeting_patterns': getMeetingPatterns(courseJson[7].split(' | ')),
        'additional': getAdditional(courseJson)
    };
}

/**
 * Retrieve the prof of a course and the instructional format
 * @param {object} courseJson - The JSON containing the course information
 * @returns {object} - A JSON representing prof and instructional format
 */
function getAdditional(courseJson) {
    let prof = courseJson[9];

    // When prof is not set
    if (!prof) {
        prof = "Prof TBD";
    }

    const instructionalFormat = courseJson[5];

    return {
        'prof': prof,
        'instructional_format': instructionalFormat
    };
}

/**
 * Parse the String for meeting pattern and split it into more specific fields
 * @param {string} meetingPattern - The string containing the meeting pattern
 * @returns {object} - A JSON representing meeting patterns with specific fields
 */
function getMeetingPatterns(meetingPattern) {
    const courseDay = meetingPattern[1].split(' ');
    let courseLocation = meetingPattern[3];

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
    if (modifier == 'pm' && hours != 12) {
        hours += 12;
    } else if (modifier == 'am' && hours == 12) {
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