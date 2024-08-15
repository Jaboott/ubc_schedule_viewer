import { useState } from 'react';
import './App.css';
import {readFile} from './util/xlsxParser';

function App() {

  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      return;
    } else {
      readFile(file);
    }

  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>React File Upload</h1>
        <input type="file" accept=".xlsx" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App;
