// Data.js
import React from 'react';
import Datas from "./Datas";
import "./data.css"

const Data = ({ model, setModel, persons,setPersons }) => {
  return (
    <>
      <button onClick={() => setModel(true)}>Add Data</button>
      
      <div className='Containor'>
        {/* Pass persons state as a prop */}
        <Datas persons={persons} setPersons={setPersons} />
      </div>
    </>
  )
}

export default Data;