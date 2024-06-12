import React from 'react'
import "./Datas.css"
const Datas = ({persons}) => {
  return (
    <div  className='table'>
      
      <table>
        <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Address</th>
        <th>State</th>
        <th>City</th>
        <th>Zipcode</th>
        <th>Skills</th>
        </tr>

        
        {
        persons.map((person, index) => (
              <tr key={index}>
              <td>{person.fname}</td>
              <td>{person.lname}</td>
              <td>{person.age}</td>
              <td>{person.address}</td>
              <td>{person.state}</td>
              <td>{person.city}</td>
              <td>{person.zipcode}</td>
              <td>{person.skills.join(', ')}</td>
            </tr>
          ))}




      </table>
    </div>
  )
}

export default Datas
