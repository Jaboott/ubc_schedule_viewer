import { useState } from 'react';

function FileUploadButton() {
    const [file, setFile] = useState();

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    }

    return (
        <div className="mt-8 flex justify-center">
            <input id="file_upload" type="file" accept=".xlsx" className="hidden" onChange={handleChange}></input>
            <label htmlFor="file_upload" className="py-2 px-3 bg-[#427bcc] rounded-full hover:bg-[#539bff] cursor-pointer">Choose File</label>
        </div>
    );
}

export default FileUploadButton;