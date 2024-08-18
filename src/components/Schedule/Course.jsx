function Course({ course }) {

    return (
        <div className="flex flex-col bg-[#a376aa] pl-2 py-1 mb-4 rounded-md place-content-center">
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