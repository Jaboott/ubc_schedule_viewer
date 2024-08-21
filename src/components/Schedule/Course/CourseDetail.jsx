import { IoPersonOutline, IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { convertDecimalTime } from "../../../util/utils";

function CourseDetail({ course }) {
    // Component of the course details
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
                        convertDecimalTime(courseDetail.meeting_patterns.start_time) + " - " +
                        convertDecimalTime(courseDetail.meeting_patterns.end_time)
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
            <hr className="border-[#363943] mb-1" />
            {course.Lecture && <CourseSection title="Lecture" courseDetail={course.Lecture} />}
            {course.Discussion && <CourseSection title="Discussion" courseDetail={course.Discussion} />}
            {course.Laboratory && <CourseSection title="Laboratory" courseDetail={course.Laboratory} />}
        </div>
    );
}

export default CourseDetail;

