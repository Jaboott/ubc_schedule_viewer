function CalendarCourse({ course, time, isHover }) {
    const startTime = course["meeting_patterns"].start_time;
    const endTime = course["meeting_patterns"].end_time;
    const isLecture = course["additional"].instructional_format == "Lecture";

    // Reduce the color by amount
    function adjustColor(color, amount) {
        const colorWithoutHash = color.slice(1);
        const num = parseInt(colorWithoutHash, 16);

        const r = Math.max(0, Math.min(255, (num >> 16) + amount));
        const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
        const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));

        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    return (
        (startTime == time || startTime - 0.5 == time)
        && course?.meeting_patterns?.start_time // Skip course without start and end time
        && <div
            className={`absolute ml-px rounded-md z-10 w-[98%] ${isHover ? "scale-110 z-20" : "null"} ease-in-out duration-300`}
            style={{
                marginTop: 56 * (startTime - Math.floor(startTime)),
                height: 56 * (endTime - startTime) - 6,
                background: isLecture ? course.color : `repeating-linear-gradient(-45deg, ${adjustColor(course.color, -75)}, ${adjustColor(course.color, -75)} 3px, ${adjustColor(course.color, -80)} 3px, ${adjustColor(course.color, -80)} 6px)`,
                border: isLecture ? null : `2px dashed ${course.color}`
            }}
        >
            <div className="flex flex-col pl-1 lg:pl-3"
                style={{
                    color: isLecture ? course.color : "white",
                    filter: isLecture ? "brightness(.35)" : null
                }}>
                <h1 className={`font-normal text-xs lg:font-medium lg:text-base`}>
                    {course["course"].course_code}
                </h1>
                <span className="text-xs mt-[-5px] lg:text-sm">
                    {course["course"].course_section}
                </span>
            </div>
        </div>
    );
}

export default CalendarCourse;
