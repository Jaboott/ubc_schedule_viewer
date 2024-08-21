function CalendarCourse({ course, time }) {
    const startTime = course["meeting_patterns"].start_time;
    const endTime = course["meeting_patterns"].end_time;

    return (
        startTime == time ||
        startTime - 0.5 == time
    ) && (
            <div
                className="absolute ml-px rounded-md z-10 w-[98%]"
                style={{
                    marginTop: 56 * (startTime - Math.floor(startTime)),
                    backgroundColor: course.color,
                    height: 56 * (endTime - startTime) - 6
                }}
            >
                <div className="flex flex-col pl-1 pt-1 lg:pl-3">
                    <h1
                        className="font-normal text-xs brightness-[35%] lg:font-medium lg:text-base"
                        style={{ color: course.color }}
                    >{course["course"].course_code}</h1>
                    <span
                        className="text-xs brightness-[35%] mt-[-5px] lg:text-sm"
                        style={{ color: course.color }}
                    >{course["course"].course_section}</span>
                </div>
            </div>
        );
}

export default CalendarCourse;