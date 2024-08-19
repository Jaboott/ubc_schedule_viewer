import { IoPersonOutline, IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";

function CourseDetail({ course }) {

    // Convert decimal time to 12 hr
    const convertTime = (time) => {
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
    
    const CourseSection = ({ title, courseDetail }) => {
        return (
            <div className="flex flex-col mb-4">
                {/* Section header */}
                <div className="flex justify-between content-center">
                    <h1>{title}</h1>
                    <span className="text-xs content-center">
                        {courseDetail.course.course_code + " " + courseDetail.course.course_section}
                    </span>
                </div>
                {/* Location */}
                <div className="flex items-center">
                    <IoLocationOutline />
                    <h1 className="text-xs pl-1">{courseDetail.meeting_patterns.course_location}</h1>
                </div>
                {/* Time */}
                <div className="flex items-center">
                    <IoMdTime />
                    <h1 className="text-xs pl-1">{
                        convertTime(courseDetail.meeting_patterns.start_time) + " - " +
                        convertTime(courseDetail.meeting_patterns.end_time)
                    }</h1>
                </div>
                {/* Professor */}
                <div className="flex items-center">
                    <IoPersonOutline />
                    <h1 className="text-xs pl-1">{courseDetail.additional.prof}</h1>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col pb-1 px-3 text-black">
            <hr className="border-[#363943]" />
            {course.Lecture && <CourseSection title="Lecture" courseDetail={course.Lecture} />}
            {course.Discussion && <CourseSection title="Discussion" courseDetail={course.Discussion} />}
            {course.Laboratory && <CourseSection title="Laboratory" courseDetail={course.Laboratory} />}
        </div>
    );
}

export default CourseDetail;

