import { useCallback, useState } from 'react';
import Calendar from './Calendar';
import LeftBar from './LeftBar';

function SchedulePage({ schedule }) {

    const [term, setTerm] = useState("term_1");

    const handleTermChange = useCallback((term) => {
        setTerm(term);
    });

    // Return null if no schedule is given yet
    if (!schedule) {
        return null; 
    }

    console.log(schedule[term]);

    return (
        <div className="flex">
            <LeftBar schedule={schedule[term]} onTermChange={handleTermChange}></LeftBar>
            <Calendar></Calendar>
        </div>
    );
}

export default SchedulePage;