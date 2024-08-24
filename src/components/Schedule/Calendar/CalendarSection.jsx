import Calendar from "./Calendar";

function CalendarSection({ schedule }) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date();

    if (schedule) {
        console.log(schedule);
    }

    return (
        <div className="flex grow flex-col">
            <h1 className="text-4xl font-medium my-5 pl-7">{monthNames[date.getMonth()] + " " + date.getDate()}</h1>
            <Calendar schedule={schedule} />
        </div>
    );
}

export default CalendarSection;