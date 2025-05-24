import { createIcsEvent } from '/src/util/icsBuilder.js';

function ExportTerm ({ courses }) {
    const handleClick = () => {
        createIcsEvent(courses);
    }

    return (
        <div className="flex content-center my-4">
            <button className="px-2 py-1 bg-[#272831] rounded-lg" onClick={handleClick}>Export Term to Calendar</button>
        </div>
    );
}

export default ExportTerm;