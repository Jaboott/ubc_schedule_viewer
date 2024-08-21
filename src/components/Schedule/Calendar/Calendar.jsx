function Calendar() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = new Date();

    return (
        <div className="flex grow flex-col">
            <h1 className="text-4xl font-medium my-5 pl-7">{monthNames[month.getMonth()]}</h1>
        </div>
    );
}

export default Calendar;