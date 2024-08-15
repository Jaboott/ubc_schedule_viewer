import * as XLSX from 'xlsx';

/**
 * Read the xlsx file 
 * @param {File} file -  The xlsx file the user inputed through form
 * @returns - Todo
 */
export function readFile(file) {
    const fileReader = new FileReader();
    
    fileReader.onload = (event) => {
        const arrayBuffer = event.target.result;
        
        const workbook = XLSX.read(arrayBuffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        // Skip the first 3 line
        const coursesJson = XLSX.utils.sheet_to_json(worksheet, {header: 1, range: 3});
        parseJson(coursesJson);
    };

    fileReader.readAsArrayBuffer(file);
}

/**
 * Parses the JSON representation of courses into list of course JSON organized by weekday
 * @param {object} coursesJson - The JSON representation of the xlsx file
 * @returns {object} - JSON representation of both term of school year
 */
function parseJson(coursesJson) {
    let term1Courses = initWeekList();
    let term2Courses = initWeekList();
    for (const courseJson of coursesJson) {
        const course = parseCourse(courseJson);
        // Seperate the list into two terms
        if (course.term == 1) {
            addCourseToList(course, term1Courses);
        } else {
            addCourseToList(course, term2Courses);
        }
    }
    // console.log({
    //     'term_1': term1Courses,
    //     'term_2': term2Courses
    // });
    return {
        'term_1': term1Courses,
        'term_2': term2Courses
    };
}

/**
 * Add a JSON course to the specified week day
 * @param {object} course 
 * @param {object[]} courseList 
 */
function addCourseToList(course, courseList) {
    // Used to convert string representation of date to index
    const dayToIndex = {
        "Mon": 0,
        "Tue": 1,
        "Wed": 2,
        "Thu": 3,
        "Fri": 4
    };

    for (const day of course['meeting_patterns'].course_day) {
        courseList[dayToIndex[day]].push(course);
    }
}

/**
 * Parse the JSON representation of a single course for specific fields
 * @param {object} courseJson - The raw JSON representation of a course
 * @returns {object} - A single JSON course with needed fields
 */
function parseCourse(courseJson) {
    return {
        'term': Number(courseJson[0].charAt(courseJson[0].indexOf('Term')+5)),
        'course': getCourseInfo(courseJson[4].split('-')),
        'meeting_patterns': getMeetingPatterns(courseJson[7].split(' | '))
    };
}

/**
 * Parse the String for meeting pattern and split it into more specific fields
 * @param {string} meetingPattern - The string containing the meeting pattern
 * @returns {object} - A JSON representing meeting patterns with specific fields
 */
function getMeetingPatterns(meetingPattern) {
    const courseDay = meetingPattern[1].split(' ');
    let [start_time, end_time] = meetingPattern[2].split(' - ');

    return {
        'start_time': convertTime(start_time),
        'end_time': convertTime(end_time),
        'course_day': courseDay
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

    const decimalHours = hours + minutes/60;

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
