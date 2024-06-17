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
      <div className='Allthing'>
        <div className='Addbtn'>
        <button className='ab' onClick={() => setModel(true)}>Add Data</button>
        </div>
        <div className='Containor'>
          {/* Pass persons state as a prop */}
          <Datas model={model} 
            setModel={setModel} 
            persons={persons} 
            setPersons={setPersons} 
          />
            <br/>
          <button className='ab' onClick={deleteAll}>Delete All</button>
        </div>
      </div>
      </>
    )
  }

  export default Data;