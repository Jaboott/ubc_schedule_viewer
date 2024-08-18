function Course({ course }) {

    return (<>
        <div className="flex flex-col bg-rose-200 pl-2 py-1 mb-3 rounded-md place-content-center">
            <h1 className="text-black">
                {course ? course["course"].course_code : "Place Holder"}
            </h1>
            <span className="text-xs pb-1 text-black">
                {course ? course["course"].course_title : "Place Holder"}
            </span>
        </div >
        <div className="flex flex-col bg-yellow-100 pl-2 py-1 mb-3 rounded-md place-content-center">
            <h1 className="text-black">
                {course ? course["course"].course_code : "Place Holder"}
            </h1>
            <span className="text-xs pb-1 text-black">
                {course ? course["course"].course_title : "Place Holder"}
            </span>
        </div >
        <div className="flex flex-col bg-violet-300 pl-2 py-1 mb-3 rounded-md place-content-center">
            <h1 className="text-black">
                {course ? course["course"].course_code : "Place Holder"}
            </h1>
            <span className="text-xs pb-1 text-black">
                {course ? course["course"].course_title : "Place Holder"}
            </span>
        </div >
        <div className="flex flex-col bg-green-100 pl-2 py-1 mb-3 rounded-md place-content-center">
            <h1 className="text-black">
                {course ? course["course"].course_code : "Place Holder"}
            </h1>
            <span className="text-xs pb-1 text-black">
                {course ? course["course"].course_title : "Place Holder"}
            </span>
        </div >
        <div className="flex flex-col bg-blue-200 pl-2 py-1 mb-3 rounded-md place-content-center">
            <h1 className="text-black">
                {course ? course["course"].course_code : "Place Holder"}
            </h1>
            <span className="text-xs pb-1 text-black">
                {course ? course["course"].course_title : "Place Holder"}
            </span>
        </div >
        <div className="flex flex-col bg-purple-300 pl-2 py-1 mb-3 rounded-md place-content-center">
            <h1 className="text-black">
                {course ? course["course"].course_code : "Place Holder"}
            </h1>
            <span className="text-xs pb-1 text-black">
                {course ? course["course"].course_title : "Place Holder"}
            </span>
        </div >
    </>);
}

export default Course;