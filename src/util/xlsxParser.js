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
            const coursesJson = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 3 });
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
    
    for (const courseJson of coursesJson) {
        const course = parseCourse(courseJson);
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
 * Convert the courses to a weekday format
 * @param {object} term1Courses - The JSON of term 1 courses
 * @param {object} term2Courses - The JSON of term 2 courses
 * @param {object} courseList - The JSON of both term courses organized by weekday
 */
export function ConvertToCalendar(term1Courses, term2Courses) {
    // Used to convert string representation of date to index
    const dayToIndex = {
        "Mon": 0,
        "Tue": 1,
        "Wed": 2,
        "Thu": 3,
        "Fri": 4
    };

    // Add courses to its matching weekdays
    const addCourse = (courses, courseList) => {
        for (const course of courses) {
            for (const day of course['meeting_patterns'].course_day) {
                courseList[dayToIndex[day]].push(course);
            }
        }
    }

    let term1CourseList = initWeekList();
    let term2CourseList = initWeekList();

    addCourse(term1Courses, term1CourseList);
    addCourse(term2Courses, term2CourseList);

    return {
        'term_1': term1CourseList,
        'term_2': term2CourseList
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

/**
 * Initialize a list containing 5 lists representing each weekday
 * @returns {object[]} - A list representing 5 days of the week 
 */
function initWeekList() {
    let weekList = [];
    for (let i = 0; i < 5; i++) {
        weekList[i] = [];
    }
    return weekList;
}

export default readFile;