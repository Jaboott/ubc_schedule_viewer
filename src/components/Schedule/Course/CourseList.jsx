import Course from './Course';

function CourseList({ courses }) {

    // Combine the courses with lab or discussion into one object
    const CombineCourse = (courses) => {
        const map = new Map();

        for (const course of courses) {
            const courseCode = course["course"].course_code;

            if (!map.has(courseCode)) {
                // Initialize the JSON
                map.set(courseCode, {
                    'course_code': courseCode,
                    'course_title': course["course"].course_title,
                    'color': course.color,
                    'course_detail': {
                        'Lecture': null,
                        'Discussion': null,
                        'Laboratory': null
                    }
                });
            }
            map.get(courseCode)["course_detail"][course["additional"].instructional_format] = course
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

