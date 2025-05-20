import {useCallback, useEffect, useState} from 'react';
import CalendarSection from './Calendar/CalendarSection';
import LeftBar from './LeftBar';
import { convertToCalendar } from '../../util/utils';

function SchedulePage({ schedule }) {
    const [term, setTerm] = useState("term_1");

    const handleTermChange = useCallback((term) => {
        setTerm(term);
    }, [term]);

    useEffect(() => {
        if (schedule["term_1"].length) setTerm("term_1");
        else if (schedule["term_2"].length) setTerm("term_2");
        else if (schedule["summer"].length) setTerm("summer");
    }, [schedule]);

    return (
        schedule &&
        <div className="flex flex-col lg:flex-row">
            <LeftBar courses={schedule[term]} term={term} onTermChange={handleTermChange} />
            <hr className="border-b border-[#282a30] lg:w-px lg:h-screen lg:border-l-2"></hr>
            <CalendarSection courses={convertToCalendar(schedule[term])} />
        </div>
    );
}

export default SchedulePage;