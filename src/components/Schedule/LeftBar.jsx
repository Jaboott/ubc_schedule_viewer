import CourseList from './CourseList';
import TermSelector from './TermSelector';

function LeftBar({ schedule, onTermChange }) {

    if (!schedule) {
        return null;
    }

    return (
        <div className="flex flex-col bg-[#191a21] rounded-lg lg:w-96">
            <div className="flex flex-col mx-4">
                <TermSelector onTermChange={onTermChange}></TermSelector>
                <hr className="border-[#363943]"></hr>
                <CourseList courses={schedule}></CourseList>
            </div>
        </div>
    );
}

export default LeftBar;