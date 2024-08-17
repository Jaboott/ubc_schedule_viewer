function TermSelector({ onTermChange }) {
    
    const handleChange = (event) => {
        const value = event.target.value;
        onTermChange(value);
    };

    return (
        <div className="mx-3 flex flex-col">
            <h1 className="py-2 font-semibold text-lg">Schedule For</h1>
            <select className="text-lg grow py-1 mb-2 rounded-lg bg-[#272831]" onChange={handleChange}>
                <option value="term_1">Term 1</option>
                <option value="term_2">Term 2</option>
            </select>
        </div>
    );
}

export default TermSelector;