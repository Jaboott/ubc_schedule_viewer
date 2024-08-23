import { convertDecimalTime } from "../../../util/utils";
import CalendarCourse from "./CalendarCourse";
import { useHover } from "../HoverContext";
import TimeLine from "./TimeLine";

function Calendar({ schedule }) {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const timeSlots = Array.from({ length: 15 }, (v, i) => i + 8);
    const { handleMouseEnter, handleMouseLeave, hoveredTag, handleClick } = useHover();
    const highLightDay = new Date().getDay();

    return (
        <div className="relative mr-2 lg:mr-14 lg:ml-7">
            <TimeLine />
            <div className="grid grid-cols-[80px_repeat(5,_1fr)] ">
                {/* Weekday Labels */}
                {daysOfWeek.map((day, index) => (
                    <div
                        key={day}
                        className={`h-16 flex items-center justify-center border-[#24252e] ${index == 0 ? 'col-start-2' : ''}`}>
                        <h1 className={`text-xl font-normal rounded-2xl px-4 ${(highLightDay - 1) == index ? "bg-[#d66d71]" : "text-white"}`}>{day}</h1>
                    </div>
                ))}

                {/* Time Slots Column */}
                <div className="col-start-1 row-start-2">
                    {timeSlots.map((time) => (
                        <div key={time} className="h-14 flex items-center justify-end mr-4 text-white">
                            <h1 className="mt-[-56px] text-sm font-medium text-[#70707e]">{convertDecimalTime(time).replace(":00", "")}</h1>
                        </div>
                    ))}
                </div>

                {/* Days Columns */}
                {daysOfWeek.map((day, index) => (
                    <div key={day} className="border-r-2 border-[#24252e]">
                        {timeSlots.map((time) => (
                            <div key={time} className="h-14 border-t-2 border-[#24252e] relative">
                                {(schedule[index] || []).map((course, idx) => (
                                    <div
                                        key={idx}
                                        onMouseEnter={() => handleMouseEnter(course["course"].course_code)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleClick(course["course"].course_code)}
                                    >
                                        <CalendarCourse course={course} time={time} isHover={hoveredTag == course["course"].course_code} />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Calendar;