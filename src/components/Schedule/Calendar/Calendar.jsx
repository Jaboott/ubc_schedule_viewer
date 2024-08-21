import { convertToDecimalTime } from "../../../util/utils";

function Calendar({ schedule }) {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const timeSlots = Array.from({ length: 15 }, (v, i) => i + 8);

    return (
        <div className="grid grid-cols-[80px_repeat(5,_1fr)] mr-10 ml-7">
            {/* Weekday Labels */}
            {daysOfWeek.map((day, index) => (
                <div
                    key={day}
                    className={`h-16 flex pt-4 justify-center border-[#24252e] ${index == 0 ? 'col-start-2' : ''}`}
                >
                    <h1 className="text-xl font-thin text-white">{day}</h1>
                </div>
            ))}

            {/* Time Slots Column */}
            <div className="col-start-1 row-start-2">
                {timeSlots.map((time) => (
                    <div key={time} className="h-14 flex items-center justify-end mr-4 text-white">
                        <h1 className="mt-[-56px] text-sm font-medium text-[#70707e]">{convertToDecimalTime(time).replace(":00", "")}</h1>
                    </div>
                ))}
            </div>

            {/* Days Columns */}
            {daysOfWeek.map((day, index) => (
                <div key={day} className="border-r-2 border-[#24252e]">
                    {timeSlots.map((time) => (
                        <div key={time} className="h-14 border-t-2 border-[#24252e] relative">
                            {(schedule[index] || []).map((course, idx) => (
                                (course["meeting_patterns"].start_time == time) && (
                                    <div
                                        key={idx}
                                        className="absolute mr-1 pt-1 pl-2 rounded-md z-10 w-[98%]"
                                        style={{
                                            backgroundColor: course.color,
                                            height: 52 * (course["meeting_patterns"].end_time - course["meeting_patterns"].start_time)
                                        }}
                                    >
                                        <h1
                                            className="font-medium brightness-[35%]"
                                            style={{ color: course.color }}
                                        >{course["course"].course_code}</h1>
                                    </div>
                                )
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Calendar;