import Course from './Course';

function CourseList({ courses }) {
    // bg-rose-200, bg-yellow-100, bg-violet-300, bg-green-100, bg-blue-200, bg-purple-300
    // Consider these colors

    return (
        <div className="mx-3 pb-2 flex flex-col">
            <h1 className="py-2 font-semibold text-lg">Courses</h1>
            <div>
                {courses.map((course, index) => (
                    <div key={index}>
                        <Course course={course} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseList;

