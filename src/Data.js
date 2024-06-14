// Data.js
import React from 'react';
import Datas from "./Datas";
import "./data.css"

const Data = ({  model, setModel, persons, setPersons}) => {
  const deleteAll = () => {
    localStorage.removeItem("myData1");
    setPersons([]);
  }

  return (
    <>
      <button onClick={() => setModel(true)}>Add Data</button>

      <div className='Containor'>
        {/* Pass persons state as a prop */}
        <Datas model={model} 
          setModel={setModel} 
          persons={persons} 
          setPersons={setPersons} 
        />
          <br/>
        <button onClick={deleteAll}>Delete All</button>
      </div>
    </>
  )
}

export default Data;