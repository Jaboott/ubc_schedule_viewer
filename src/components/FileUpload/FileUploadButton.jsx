function FileUploadButton({ onFileUpload }) {
    const handleChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFileUpload(file);
        }
    }

    return (
        <div className="mt-8 flex justify-center item-center">
            <input id="file_upload" type="file" accept=".xlsx" className="hidden" onChange={handleChange}></input>
            <label htmlFor="file_upload" className="py-2 px-3 bg-[#427bcc] rounded-full hover:bg-[#539bff] cursor-pointer">Choose File</label>
        </div>
    );
}

export default FileUploadButton;