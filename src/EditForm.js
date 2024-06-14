import React, { useState } from 'react';
import { indianCities } from './statecitydata';
import "./editform.css";

const EditForm = ({        
  model,
  setModel,
  persons,
  setPersons,
  selectedPersonId,
  editmodel,
  setEditModel
}) => {
  const selectedPerson = persons.find(person => person.id === selectedPersonId);

  const [state, setState] = useState(selectedPerson.state);
  const [city, setCity] = useState(selectedPerson.city);
  const [firstname, setFirstName] = useState(selectedPerson.fname);
  const [lastname, setLastName] = useState(selectedPerson.lname);
  const [birthdate, setBirthdate] = useState(selectedPerson.birthdate);
  const [address, setAddress] = useState(selectedPerson.address);
  const [age, setAge] = useState(selectedPerson.age);
  const [allchecked, setAllChecked] = useState(selectedPerson.skills);
  const [zipcode, setZipcode] = useState(selectedPerson.zipcode);

  const handleChange = (e) => {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
    } else {
      setAllChecked(allchecked.filter(item => item !== e.target.value));
    }
  };

  const handleBirthChange = (e) => {
    setBirthdate(e.target.value);

    const birthdateObj = new Date(e.target.value);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const birthYear = birthdateObj.getFullYear();
    const birthMonth = birthdateObj.getMonth();
    let age = currentYear - birthYear;

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthdateObj.getDate())) {
      age--;
    }

    setAge(age);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleZipcode = (e) => {
    setZipcode(e.target.value);
  };

  const handlefnChange = (e) => {
    setFirstName(e.target.value);
  };

  const handlelnChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update person data
    const updatedPersons = persons.map(person => {
      if (person.id === selectedPersonId) {
        return {
          ...person,
          fname: firstname,
          lname: lastname,
          age: age,
          birthdate: birthdate,
          address: address,
          skills: allchecked,
          zipcode: zipcode,
          state: state,
          city: city
        };
      }
      return person;
    });

    // Update persons state and local storage
    setPersons(updatedPersons);
    localStorage.setItem("myData1", JSON.stringify(updatedPersons));

    // Close the form
    setEditModel(false);
  };

  const handleState = (e) => {
    setState(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="edit-form-background">
      <div className="edit-form-container">
        <form onSubmit={handleSubmit}>
          <button type="button" className='btn-close' onClick={() => setEditModel(false)}>X</button>
          <br />
          <label className='inputs'>First Name:<input type="text" value={firstname} onChange={handlefnChange} required /></label>
          <br />
          <label className='inputs'>Last Name:<input type="text" value={lastname} onChange={handlelnChange} required /></label>
          <br />
          <label>DOB:<input type="date" value={birthdate} onChange={handleBirthChange} required /></label>
          <br />
          <br/>
          <label>Area Of Interest</label>
          <div>
            <input value="Java" type="checkbox" checked={allchecked.includes("Java")} onChange={handleChange} />
            <span> Java </span>
          </div>
          <div>
            <input value="Python" type="checkbox" checked={allchecked.includes("Python")} onChange={handleChange} />
            <span> Python </span>
          </div>
          <div>
            <input value="Data-mining" type="checkbox" checked={allchecked.includes("Data-mining")} onChange={handleChange} />
            <span> Data-Mining </span>
          </div>
          <br />
          <label>Address:
            <br />
            <br/>
            <textarea value={address} onChange={handleAddress} rows={4} cols={50} required /></label>
          <br />
          <label>State:
            <select value={state} onChange={handleState} required>
              <option value="">State</option>
              {Object.keys(indianCities).map((state, index) => (
                <option value={state} key={index}>{state}</option>
              ))}
            </select>
          </label>
          <br />
          <br/>
          <label>City:{state ? (<select value={city} onChange={handleCity} required>
            <option value="">City</option>
            {indianCities[state].map((city, index) => (
              <option value={city} key={index}>{city}</option>
            ))}
          </select>) : <select><option>City</option></select>}
          </label>
          <br />
          <br/>
          <label>Zipcode: <input type='tel' maxLength={6} minLength={6} value={zipcode} onChange={handleZipcode} required /></label>
          <br />
          <div className="form-group">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
