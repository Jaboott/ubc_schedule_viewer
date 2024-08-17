import { useState } from 'react';
import FileUploadButton from "./FileUploadButton";

function FileUploadSection({ onFileUpload }) {
    const [error, setError] = useState(false);

    const handleDrop = (event) => {
        event.preventDefault();
        const drop_file = event.dataTransfer.files[0];

        if (drop_file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            onFileUpload(drop_file);
        } else {
            setError(true);

            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div onDrop={handleDrop} onDragOver={handleDragOver} className="flex flex-col justify-center content-start bg-[#191a21] border-2 border-dashed border-[#83828B] rounded-xl py-14">
            <span className={`text-center text-2xl font-bold pb-2 ${error ? "text-[#f06161]" : "text-[#83828B]"}`}>
                {error ? 'Wrong file type!' : 'Upload your file'}
            </span>
            <span className={`text-sm text-center ${error ? "text-[#f06161]" : "text-[#83828B]"}`}>
                {error
                    ? 'Application only support .xlsx file.'
                    : 'Click Choose File button to get started or drag and drop files to upload.'
                }
            </span>
            <FileUploadButton onFileUpload={onFileUpload}></FileUploadButton>
        </div>
    );
}

export default FileUploadSection;