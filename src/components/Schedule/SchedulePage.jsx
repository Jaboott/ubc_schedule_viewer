import { useCallback, useState } from 'react';
import Calendar from './Calendar';
import LeftBar from './LeftBar';

function SchedulePage({ schedule }) {

    const [term, setTerm] = useState("term_1");

    const handleTermChange = useCallback((term) => {
        setTerm(term);
    }, [term]);

    return (<> {schedule &&
        <div className="flex flex-col lg:flex-row">
            <LeftBar schedule={schedule[term]} onTermChange={handleTermChange}></LeftBar>
            <hr className="border-b border-[#282a30] lg:w-px lg:h-screen lg:border-l-2"></hr>
            <Calendar></Calendar>
        </div>
    }
    </>);
}

export default SchedulePage;