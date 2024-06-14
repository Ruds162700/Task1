  import React, { useState } from 'react';
  import { indianCities } from './statecitydata';
  const Form = ({ model, setModel, persons, setPersons}) => {

 

    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState(NaN);
    const [allchecked, setAllChecked] = useState([]);
    const [zipcode, setZipcode] = useState("");

    const handleChange = (e) => {
      if (e.target.checked) {
        setAllChecked([...allchecked, e.target.value]);

      } else {
        setAllChecked(allchecked.filter((item) => item !== e.target.value));
      }
    }



    const handleBirthChange = (e) => {
      const newBirthdate = e.target.value;
      setBirthdate(newBirthdate);


      const birthdateObj = new Date(newBirthdate);
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
    }

    const handleZipcode = (e) => {
      setZipcode(e.target.value);
    }

    const handlefnChange = (e) => {
      setFirstName(e.target.value);
    };

    const handlelnChange = (e) => {
      setLastName(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Add new person data
      const updated = [
        ...persons,
        {
          id: new Date().getTime().toString(),
          fname: firstname,
          lname: lastname,
          age: age,
          address: address,
          skills: allchecked,
          zipcode: zipcode,
          state: state,
          city: city,
          birthdate:birthdate,
        }
      ];
    
      // Reset form fields
      setFirstName("");
      setLastName("");
      setBirthdate("");
      setAddress("");
      setAge(NaN);
      setAllChecked([]);
      setZipcode("");
      setCity("");
      setState("");
      setBirthdate("");
    
      // Update persons state and local storage
      setPersons(updated);
      localStorage.setItem("myData1", JSON.stringify(updated));
    
      // Close the form
      setModel(false);
    };
    

    const handleState = (e) => {
      setState(e.target.value);
    }
    const handleCity = (e) => {
      setCity(e.target.value);
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <button className='btn-error' onClick={() => setModel(false)}>X</button>
          <br />
          <label className='inputs'>First Name:<input type="text" value={firstname} onChange={handlefnChange} required /></label>
          <br />
          <label className='inputs'>Last Name:<input type="text" value={lastname} onChange={handlelnChange} required /></label>
          <br />
          <label>DOB:<input type="date" value={birthdate} onChange={handleBirthChange} required /></label>
          <br />
          <label>Area Of Interest</label>
          <div>
            <input value="Java" type="checkbox" onChange={handleChange} />
            <span> Java </span>
          </div>

          <div>
            <input value="Python" type="checkbox" onChange={handleChange} />
            <span> Python </span>
          </div>

          <div>
            <input value="Data-mining" type="checkbox" onChange={handleChange} />
            <span> Data-Mining </span>
          </div>
          <br />

          <label>Address:
            <br />
            <textarea value={address} onChange={handleAddress} rows={4} cols={50} required/></label>
          <br />

          <label>State:
            <select value={state} onChange={handleState} required>
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

          <label>City:{state ? (<select value={city} onChange={handleCity} required>
            <option value="">City</option>
            {
              indianCities[state].map((city, index) => (
                <>
                  <option value={city} key={index}>{city}</option>
                </>
              ))
            }
          </select>):<select><option>City</option></select>}
          </label>

          <br />




          <label>Zipcode: <input type='tel' maxLength={6} minLength={6} value={zipcode} onChange={handleZipcode} required /></label>
          <br />


          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

  export default Form;
