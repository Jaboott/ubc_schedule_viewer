import CourseList from './Course/CourseList';
import TermSelector from './TermSelector';
import ResetFile from './ResetFile';

function LeftBar({ courses, term, onTermChange }) {
    if (!courses) return null;

    return (
        <div className="flex flex-col bg-[#191a21] rounded-lg lg:w-96">
            <div className="flex flex-col mx-4">
                <TermSelector term={term} onTermChange={onTermChange} />
                <ResetFile />
                <hr className="border-[#363943]"></hr>
                <CourseList courses={courses} />
            </div>
        </div>
    );
}

export default LeftBar;