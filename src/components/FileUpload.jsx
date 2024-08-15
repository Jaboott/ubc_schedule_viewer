import { useState } from 'react';
import { readFile } from '../util/xlsxParser';

const FileUpload = () => {
    const [file, setFile] = useState();

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (file) {
            readFile(file);
        }
        return;
    }

    return (<>
        <form onSubmit={handleSubmit}>
            <h1>React File Upload</h1>
            <input type="file" accept=".xlsx" onChange={handleChange} />
            <button type="submit">Upload</button>
        </form>
    </>);
}

export default FileUpload;