import { useCallback, useState } from 'react';
import Calendar from './Calendar/Calendar';
import LeftBar from './LeftBar';

function SchedulePage({ schedule }) {

    const [term, setTerm] = useState("term_1");

    const handleTermChange = useCallback((term) => {
        setTerm(term);
    }, [term]);

    const events = {
        Monday: [
          { title: 'Morning Meeting', time: '9:00' },
          { title: 'Lunch with Team', time: '12:00' }
        ],
        Tuesday: [
          { title: 'Client Call', time: '14:00' }
        ],
        Wednesday: [
          { title: 'Project Review', time: '10:00' }
        ],
        Friday: [
          { title: 'Presentation', time: '11:00' }
        ]
      };
    

    return (<> {schedule &&
        <div className="flex flex-col lg:flex-row">
            <LeftBar schedule={schedule[term]} onTermChange={handleTermChange}></LeftBar>
            <hr className="border-b border-[#282a30] lg:w-px lg:h-screen lg:border-l-2"></hr>
            <Calendar events={events}></Calendar>
        </div>
    }
    </>);
}

export default SchedulePage;