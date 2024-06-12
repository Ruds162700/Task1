// App.js
import React, { useState } from 'react';
import Data from "./Data";
import Form from "./Form";
import "./App.css"; // Import the CSS file for styling

const App = () => {
  // Define only persons and from states in the App component
  const [persons, setPersons] = useState([]);
  // const [from, setForm] = useState({
  //   fname: "",
  //   lname: "",
  //   age: "",
  //   address:"",
  //   Skills:[],
  // });

  // State to decide whether to show the form or the data
  const [model, setModel] = useState(false);

  return (
    <div className="App">
      {/* Conditionally render the popup overlay */}
      {model && <div className="popup-overlay" onClick={() => setModel(false)} />}
      {/* Conditionally render the form */}
      <div className={`popup ${model ? 'active' : ''}`}>
        {model && <Form model={model} setModel={setModel} persons={persons} setPersons={setPersons}  />}
      </div>
      {/* Render the data component */}
      <div>
        <Data model={model} setModel={setModel} persons={persons} setPersons={setPersons} />
      </div>
    </div>
  );  
}

export default App;
