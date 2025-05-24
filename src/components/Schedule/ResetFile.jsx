function ResetFile() {

    const handleClick = () => {
        localStorage.clear();
        location.reload();
    }

    return (
        <div className="flex content-center my-4">
            <button className="px-2 py-1 bg-[#272831] rounded-lg" onClick={handleClick}>Select Another</button>
        </div>
    );
}

export default ResetFile;