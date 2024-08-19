import { useCallback, useState } from 'react';
import Calendar from './Calendar';
import LeftBar from './LeftBar';

function SchedulePage({ schedule }) {

    const [term, setTerm] = useState("term_1");

    const handleTermChange = useCallback((term) => {
        setTerm(term);
    }, [term]);

    return (<> {schedule &&
        <div className="flex">
            <LeftBar schedule={schedule[term]} onTermChange={handleTermChange}></LeftBar>
            <hr className="border-l-2 h-screen w-px border-[#282a30]"></hr>
            <Calendar></Calendar>
        </div>
    }
    </>);
}

export default SchedulePage;