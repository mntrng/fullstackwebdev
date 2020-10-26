import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import dbService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchString, setSearchString ] = useState('')
  const [ searchState, setSearchState ] = useState(false)
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    dbService.getAll()
             .then(response => {setPersons(response.data)})
  }, [])

  const handleNotice = (message, status) => {
    setNotification( [message, status] )
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addNewData = event => {
    event.preventDefault()
    const person = validateInput()

    if (!person) {

      const personObject = {
        name: newName,
        phone: newNumber
      } 
      
      dbService.create(personObject)
               .then(personObjectWithID => {
                 setPersons(persons.concat(personObjectWithID.data))
                 handleNotice(`Added ${newName}`, true)})
    } else {
      if ((window.confirm(`${newName} exists in the phonebook, replace the old number with a new one?`))) {
        const updatedPerson = {...person, phone: newNumber}
        dbService
          .update(updatedPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : response.data));
            handleNotice(`Updated number for ${person.name}`, true)
          })
          .catch((error) => {
            console.log(error.response.data.error);
          })
      }
    }

    setNewName('')
    setNewNumber('')
  }

  const handleDelete = id => {
    var person = persons.find(p => id === p.id)

    if (window.confirm(`Delete ${person.name}?`)) {
      dbService
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          handleNotice(`Deleted ${person.name}`, true)
        })
        .catch(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          handleNotice(`${person.name} has already been deleted!`, false)
        })
  }}

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleSearch = event => {
    if (event.target.value.trim().length > 0) {
      setSearchState(true)
    } else {
      setSearchState(false)
    }

    setSearchString(event.target.value)
  }

  const validateInput = () => persons.find(
    p => p.name.toLowerCase() === newName.toLowerCase()
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notification} />
      <Filter searchString = {searchString}
              handleSearch = {handleSearch}
      />
      <h3>Add new data</h3>
      <PersonForm addNewData = {addNewData}
                  newName = {newName}
                  newNumber = {newNumber}
                  handleNameChange = {handleNameChange}
                  handleNumberChange = {handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons searchState = {searchState}
               persons = {persons}
               searchString = {searchString}
               deleteContact = {handleDelete}
      />
    </div>
  )
}

export default App;