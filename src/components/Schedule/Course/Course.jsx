import { FiChevronLeft } from "react-icons/fi";
import { useState, useEffect, useRef } from 'react';
import CourseDetail from "./CourseDetail";
import { useHover } from "../HoverContext";

function Course({ course }) {
    const [expand, setExpand] = useState(false);
    const contentRef = useRef(null);
    const { handleMouseEnter, handleMouseLeave, hoveredTag, clickedTag, isClicked } = useHover();

    const handleClick = () => {
        setExpand(!expand);
    }

    // Resetting the state when Term changes
    useEffect(() => {
        setExpand(false);
    }, [course]);
    
    // Expand card when calendar equivalent gets clicked on
    useEffect(() => {
        if (clickedTag == course.course_code) {
            setExpand(!expand);
        }
    }, [clickedTag, isClicked]);

    // Transition effect for interacting with a course
    useEffect(() => {
        if (expand && contentRef.current) {
            contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
        } else if (contentRef.current || course) {
            contentRef.current.style.maxHeight = "0px";
        }
    }, [expand]);

    return (
        <div
            className={`flex flex-col mb-4 rounded-md ${hoveredTag == course.course_code ? "scale-[1.05] z-20" : "null"} ease-in-out duration-300`}
            style={{ backgroundColor: course.color }}
            onMouseEnter={() => handleMouseEnter(course.course_code)}
            onMouseLeave={handleMouseLeave}
        >
            
            {/* General Course Information */}
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
            
            {/* Course Details */}
            <div
                ref={contentRef}
                className="overflow-hidden duration-300 ease-in-out"
                style={{ maxHeight: "0px" }}
            >
                <CourseDetail course={course.course_detail} />
            </div>
        </div>
    );
}

export default Course;