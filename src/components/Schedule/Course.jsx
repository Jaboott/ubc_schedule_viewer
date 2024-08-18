function Course({ course }) {

    return (
        <div className="flex flex-col mb-4 pl-2 py-1 rounded-md place-content-center hover:scale-[1.01] ease-in-out duration-100"
            style={{ backgroundColor: course.color }}>
            <h1 className="text-black">
                {course ? course.course_code : "Place Holder"}
            </h1>
            <span className="text-xs pb-1 text-black">
                {course ? course.course_title : "Place Holder"}
            </span>
        </div>
    );
}

export default Course;