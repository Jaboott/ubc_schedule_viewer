import { useState, useCallback } from 'react';
import FileUploadSection from './components/FileUpload/FileUploadPage';
import SchedulePage from './components/Schedule/SchedulePage';
import readFile from './util/xlsxParser';
import { HoverProvider } from './components/Schedule/HoverContext.jsx';

function App() {

  const [file, setFile] = useState(JSON.parse(localStorage.getItem("schedule")));

  const handleFileUpload = useCallback(async (uploaded_file) => {
    readFile(uploaded_file)
      .then((parsed_file) => {
        console.log(typeof parsed_file);
        setFile(parsed_file);
      })
  }, [readFile, setFile]);

  return (
    <div className="App">
      {file
        ? <HoverProvider>
          <SchedulePage schedule={file} />
        </HoverProvider>
        : <FileUploadSection onFileUpload={handleFileUpload} />
      }
    </div>
  );
}

export default App;
