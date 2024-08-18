import Course from './Course';

function CourseList({ courses }) {

    // Combine the courses with lab or discussion into one object
    const CombineCourse = (courses) => {
        const map = new Map();
        const colors = ["#a376aa", "#d18887", "#72b097", "#8e8dc4", "#d6ab79", "#98d089"];
        let unique = 0;

        for (const course of courses) {
            const courseCode = course["course"].course_code;

            if (!map.has(courseCode)) {
                map.set(courseCode, {
                    'course_code': courseCode,
                    'course_title': course["course"].course_title,
                    'color': colors[unique],
                    'Lecture': null,
                    'Discussion': null,
                    'Laboratory': null
                });
                unique++;
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

