
// Convert decimal time to 12 hr
export function convertToDecimalTime(time) {
    let hours = Math.floor(time);
    let minutes = Math.round((time - hours) * 60);
    const modifier = (hours >= 12) && (hours != 24) ? 'PM' : 'AM';

    if (hours > 12) {
        hours = hours - 12;
    } else if (hours == 0 || hours == 24) {
        hours = 12;
    }

    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes} ${modifier}`;
}

/**
 * Convert the courses to a weekday format
 * @param {object} termCourses - The JSON of term courses
 * @param {object} courseList - The JSON of both term courses organized by weekday
 */
export function convertToCalendar(termCourses) {
    // Used to convert string representation of date to index
    const dayToIndex = {
        "Mon": 0,
        "Tue": 1,
        "Wed": 2,
        "Thu": 3,
        "Fri": 4
    };

    // Initialize a empty list with 5 index
    const  initWeekList = () => {
        let weekList = [];
        for (let i = 0; i < 5; i++) {
            weekList[i] = [];
        }
        return weekList;
    }

    // Add courses to its matching weekdays
    const addCourse = (courses, courseList) => {
        for (const course of courses) {
            for (const day of course['meeting_patterns'].course_day) {
                courseList[dayToIndex[day]].push(course);
            }
        }
    }

    let termCourseList = initWeekList();

    addCourse(termCourses, termCourseList);

    return termCourseList;
}