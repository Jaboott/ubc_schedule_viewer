import { useCallback, useState } from 'react';
import Calendar from './Calendar';
import LeftBar from './LeftBar';
import { ConvertToCalendar } from '../../util/xlsxParser';

function SchedulePage({ schedule }) {

    const [term, setTerm] = useState("term_1");

    const handleTermChange = useCallback((term) => {
        setTerm(term);
    });

    // Return null if no schedule is given yet
    if (!schedule) {
        return null; 
    } 
    
    return (
        <div className="flex">
            <LeftBar schedule={schedule[term]} onTermChange={handleTermChange}></LeftBar>
            <hr className="border-l-2 h-screen w-px border-[#282a30]"></hr>
            <Calendar></Calendar>
        </div>
    );
}

export default SchedulePage;