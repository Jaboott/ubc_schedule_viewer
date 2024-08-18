import Course from './Course';

function CourseList({ courses }) {
    // bg-rose-200, bg-yellow-100, bg-violet-300, bg-green-100, bg-blue-200, bg-purple-300
    // Consider these colors

    const CombineCourse = (courses) => {
        let map = new Map();

        for (const course of courses) {
            let courseCode = course["course"].course_code;

            if (!map.has(courseCode)) {
                map.set(courseCode, {
                    'course_code': courseCode,
                    'course_title': course["course"].course_title,
                    'Lecture': null,
                    'Discussion': null,
                    'Laboratory': null
                });
            }
            map.get(courseCode)[course["additional"].instructional_format] = course
        }
        return Array.from(map.values());
    }

    return (
        <div className="pt-3 flex flex-col">
            <h1 className="font-semibold pb-3 text-lg">Courses</h1>
            <div>
                {CombineCourse(courses).map((course, index) => (
                    <div key={index}>
                        <Course course={course} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseList;

