function TermSelector({ onTermChange }) {
    
    const handleChange = (event) => {
        const value = event.target.value;
        onTermChange(value);
    };

    return (
        <div className="pt-5 flex flex-col">
            <h1 className="pb-3 font-semibold text-lg">Schedule For</h1>
            <select className="text-lg grow py-1 rounded-lg bg-[#272831]" onChange={handleChange}>
                <option value="term_1">Term 1</option>
                <option value="term_2">Term 2</option>
            </select>
        </div>
    );
}

export default TermSelector;