import { FiChevronLeft } from "react-icons/fi";
import { useState, useEffect, useRef } from 'react';
import CourseDetail from "./CourseDetail";

function Course({ course }) {

    const [expand, setExpand] = useState(false);
    const contentRef = useRef(null);

    const handleClick = () => {
        setExpand(!expand);
    }

    // Resetting the state when Term changes
    useEffect(() => {
        setExpand(false);
    }, [course]);

    // Transition effect for interacting with a course
    useEffect(() => {
        if (expand && contentRef.current) {
            contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
        } else if (contentRef.current || course) {
            contentRef.current.style.maxHeight = "0px";
        }
    }, [expand]);

    return (
        <div className="flex flex-col mb-4 rounded-md hover:scale-[1.01]" style={{ backgroundColor: course.color }}>
            <div className="flex justify-between px-3 py-1 hover:cursor-pointer"
                onClick={handleClick}>
                <div className="flex flex-col place-content-center">
                    <h1 className="text-[#282c34] font-medium">
                        {course ? course.course_code : "Place Holder"}
                    </h1>
                    <span className="text-xs pb-1 text-black">
                        {course ? course.course_title : "Place Holder"}
                    </span>
                </div>
                <i className={`mr-3 place-content-center ${expand ? "rotate-[-90deg]" : "rotate-0"} ease-in-out duration-100`}><FiChevronLeft className="text-[#696b6f] text-xl" /></i>
            </div>
            <div
                ref={contentRef}
                className="duration-300 ease-in-out"
                style={{ maxHeight: "0px" }}
            >
                <CourseDetail course={course.course_detail} />
            </div>
        </div>
    );
}

export default Course;