import { useCallback, useState } from 'react';
import CalendarSection from './Calendar/CalendarSection';
import LeftBar from './LeftBar';
import { convertToCalendar } from '../../util/utils';

function SchedulePage({ schedule }) {
    const [term, setTerm] = useState("term_1");

    const handleTermChange = useCallback((term) => {
        setTerm(term);
    }, [term]);

    return (<> {schedule &&
        <div className="flex flex-col lg:flex-row">
            <LeftBar
                schedule={schedule[term]}
                onTermChange={handleTermChange}
            />
            <hr className="border-b border-[#282a30] lg:w-px lg:h-screen lg:border-l-2"></hr>
            <CalendarSection schedule={convertToCalendar(schedule[term])} />
        </div>
    }
    </>);
}

export default SchedulePage;