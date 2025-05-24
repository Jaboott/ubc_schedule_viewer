import Calendar from "./Calendar";

function CalendarSection({ courses }) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date();

    if (courses) console.log(courses);

    return (
        <div className="flex grow flex-col">
            <h1 className="text-4xl font-medium my-5 pl-7">{monthNames[date.getMonth()] + " " + date.getDate()}</h1>
            <Calendar courses={courses} />
        </div>
    );
}

export default CalendarSection;