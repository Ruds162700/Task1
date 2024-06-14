// App.js
import React, { useState } from 'react';
import Data from "./Data";
import Form from "./Form";
import "./App.css";

const getLocalData = () => {
  const lists = localStorage.getItem("myData1");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const App = () => {

  const [model, setModel] = useState(false);
  const [persons, setPersons] = useState(getLocalData());

 
  return (
    <div className="App">
      {model && <div className="popup-overlay" onClick={() => setModel(false)} />}
      <div className={`popup ${model ? 'active' : ''}`}>
        {model && (
          <Form
            model={model}
            setModel={setModel}
            persons={persons}
            setPersons={setPersons}

          />
        )}
      
      </div>
      <div>
        <Data
          model={model}
          setModel={setModel}
          persons={persons}
          setPersons={setPersons}

        />
      </div>
    </div>
  );
}

export default App;
