import React from 'react'

const Persons = (props) => {
    let persons1 = [];

    if (!props.searchState) {
      persons1 = [...props.persons]  
    } else {
      persons1 = props.persons.filter(person => person.name.toLowerCase().includes(props.searchString.toLowerCase()))
    }

    return persons1.map(person => (
      <div key = {person.name} id = {person.id}>
        {person.name} : {person.phone} <button onClick={() => props.deleteContact(person.id)}>Delete</button>
      </div>
    ))
  }

export default Persons