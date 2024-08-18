import { useState, useCallback } from 'react';
import './App.css';
import FileUploadSection from './components/FileUpload/FileUploadPage';
import SchedulePage from './components/Schedule/SchedulePage';
import readFile from './util/xlsxParser';

function App() {

  const [file, setFile] = useState();

  const handleFileUpload = useCallback(async (uploaded_file) => {
    readFile(uploaded_file)
      .then((parsed_file) => {
        console.log(parsed_file);
        setFile(parsed_file);
      })
  }, [readFile, setFile]);

  return (
    <div className="App">
      {(file)
        ? <SchedulePage schedule={file}></SchedulePage>
        : <FileUploadSection onFileUpload={handleFileUpload}></FileUploadSection>
      }
    </div>
  );
}

export default App;
