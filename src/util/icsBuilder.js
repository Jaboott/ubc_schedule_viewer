import * as ics from "ics";

const EXCEL_EPOCH = Date.UTC(1899, 11, 30);   // 1899-12-30
const MS_PER_DAY  = 24 * 60 * 60 * 1000;
const dayToRruleMapping = {
    "Mon": "MO",
    "Tue": "TU",
    "Wed": "WE",
    "Thu": "TH",
    "Fri": "FR",
};

export function createIcsEvent(courses) {
    const eventsList = []

    for (const course of courses) {
        try {
            eventsList.push(createCourseIcs(course));
        } catch (err) {
            console.log("Skipped generating ICS of course " + course["course"].course_code+" because it have no meeting pattern")
        }
    }

    console.log(ics.createEvents(eventsList).value);

    ics.createEvents(eventsList, (err, value) => {
        if (err) {
            console.log(err.message);
        }
        const blob = new Blob([value], { type: "text/calendar" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "schedule.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    });

}

// TODO: Consider if missing information
function createCourseIcs(course) {
    const courseTitle = `${course.course.course_code} ${course.course.course_section}`;
    const courseLocation = course.meeting_patterns.course_location;
    const courseStartTime = course.meeting_patterns.start_time
    const courseEndTime = course.meeting_patterns.end_time;
    const termStartDate = excelSerialToDate(course.course_duration.start);
    const termEndDate = excelSerialToDate(course.course_duration.end);

    // don't have access to the date the course first starts, computing that date here
    const courseStartDate = new Date(termStartDate);
    const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const courseDayNum = dayMap[course.meeting_patterns.course_day[0]];
    const daysToAdd = (courseDayNum - courseStartDate.getDay() + 7) % 7;
    courseStartDate.setDate(courseStartDate.getDate() + daysToAdd);

    const courseDays = course.meeting_patterns.course_day.map(
        (day) => {return dayToRruleMapping[day]}
    ).join(",");
    const courseRecurrenceRule = `FREQ=WEEKLY;BYDAY=${courseDays};INTERVAL=1;UNTIL=${dateToIcsString(termEndDate)};`;

    return {
        title: courseTitle,
        location: courseLocation,
        start: dateToIcsArray(courseStartDate, courseStartTime),
        startOutputType: "local",
        duration: getDuration(courseStartTime, courseEndTime),
        recurrenceRule: courseRecurrenceRule,
    }
}

function excelSerialToDate(serial) {
    return new Date(EXCEL_EPOCH + serial * MS_PER_DAY);
}

function dateToIcsArray(date, time = 23.9) {
    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        Math.floor(time),
        60 * (time - Math.floor(time)),
    ]
}

function dateToIcsString(date) {
    const pad = (n) => n.toString().padStart(2, '0');
    return `${pad(date.getFullYear())}${pad(date.getMonth() + 1)}${pad(date.getDate())}T235959`;
}

function getDuration(start, end) {
    const totalMinutes = Math.round((end - start) * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours: hours, minutes: minutes };
}

