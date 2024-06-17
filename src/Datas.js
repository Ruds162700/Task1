import React, { useState, useEffect } from 'react';
import "./Datas.css";
import { indianCities } from './statecitydata';

import EditForm from './EditForm';

  const Datas = ({ model, setModel, persons, setPersons}) => {

   //it is in trial base
    const [editmodel,setEditModel] = useState(false);
    const [selectedPersonId,setSelectedPersonId] = useState(null);
    const [selectedPerson,setSelectedPerson] = useState();




  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  //states for filtering the data based on cities ,state and name
  const [namesearch, setnameSearch] = useState("");
  const [statesearch, setstateSearch] = useState("");
  const [citysearch, setcitySearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  //this will update our data each time someone addnew data or do filtering by given 3 options
  useEffect(() => {
    const filtered = persons.filter(person => {
      const lowerCaseFname = person.fname.toLowerCase();
      const lowerCaseLname = person.lname.toLowerCase();
      const lowerCaseSearch = namesearch.toLowerCase();
      const selectedState = statesearch;
      const selectedCity = citysearch;

      return (
        (lowerCaseFname.includes(lowerCaseSearch) || lowerCaseLname.includes(lowerCaseSearch)) &&
        (selectedState === "" || person.state === selectedState) &&
        (selectedCity === "" || person.city === selectedCity)
      );
    });

    setFilteredPersons(filtered);
  }, [persons, namesearch, statesearch, citysearch]);






  const openDeleteConfirmation = (id) => {
    setDeleteId(id);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDelete = () => {
    const storedData = localStorage.getItem("myData1");

    if (storedData) {
      const personsArray = JSON.parse(storedData);
      const updatedArray = personsArray.filter(person => person.id !== deleteId);

      localStorage.setItem("myData1", JSON.stringify(updatedArray));
      setPersons(updatedArray);
      setIsDeleteConfirmationOpen(false);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setIsDeleteConfirmationOpen(false);
  };



  return (

    <div className='table'>
      <div className='search'>
      <label className='child'>
        SearchByName:
        <input 
          type='text'
          value={namesearch}
          onChange={(e) => {
            setnameSearch(e.target.value);
            console.log(e.target.value);
          }}
        />
      </label>
      <br />
      <br />
      <label className='child'>SearchByState:
        <select value={statesearch} onChange={(e) => setstateSearch(e.target.value)} required>
          <option value="">State</option>
          {
            Object.keys(indianCities).map((state, index) => (
              <>
                <option value={state} key={index} required>{state}</option>
              </>
            ))
          }
        </select>
      </label>
      <br />
      <br />
      <label className='child'>SearchByCity:{statesearch ? (<select value={citysearch} onChange={(e) => setcitySearch(e.target.value)}>
        <option value="">City</option>
        {
          indianCities[statesearch].map((city, index) => (
            <>
              <option value={city} key={index}>{city}</option>
            </>
          ))
        }
      </select>) : <select><option>City</option></select>}
      </label>
      <br />
      <br />
       </div>
      <button className='clfb' onClick={()=>{
        setnameSearch("");
        setstateSearch("");
        setcitySearch("");
        }}>Clear Filter</button>
     
      <br/>
      <br/>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>State</th>
            <th>City</th>
            <th>Zipcode</th>
            <th>Skills</th>
            <th>Functionality</th>
          </tr>
        </thead>
        <tbody>
          {filteredPersons.map((person) => (
            <tr key={person.id}>
              <td>{person.fname}</td>
              <td>{person.lname}</td>
              <td>{person.age}</td>
              <td>{person.address}</td>
              <td>{person.state}</td>
              <td>{person.city}</td>
              <td>{person.zipcode}</td>
              <td>{person.skills.join(', ')}</td>
              <td>
                <button className='far fa-edit add-btn' id='edb' onClick={(e)=>{
                  setSelectedPersonId(person.id);
                  setEditModel(true);
                }}>Edit</button>
                <button className='far fa-trash-alt add-btn' id='dlb' onClick={() => openDeleteConfirmation(person.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDeleteConfirmationOpen && (
        <div className="delete-confirmation-modal">
          <div className="delete-confirmation-content">
            <p>Are you sure you want to delete the data?</p>
            <div className="delete-confirmation-buttons">
              <button className="delete-btn" onClick={handleDelete}>Yes</button>
              <button className="cancel-btn" onClick={cancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
     
     {editmodel && (
        <EditForm
        model={model}
        setModel={setModel}
        persons={persons}
        setPersons={setPersons}
        selectedPersonId={selectedPersonId}
        setSelectedPerson={setSelectedPerson}
        editmodel = {editmodel}
        setEditModel = {setEditModel}
        />
      )}



    </div>
  );
};

export default Datas;
