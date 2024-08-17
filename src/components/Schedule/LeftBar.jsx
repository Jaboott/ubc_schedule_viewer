import CourseList from './CourseList';
import TermSelector from './TermSelector';

function LeftBar({ schedule, onTermChange}) {

    return (
        <div className="flex flex-col w-80 bg-[#191a21] rounded-lg">
            <TermSelector onTermChange={onTermChange}></TermSelector>
            <hr className="mx-3 border-[#484a55]"></hr>
            <CourseList></CourseList>
        </div>
    );
}

export default LeftBar;