import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Display from './components/Display'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchString, setSearchString ] = useState('')

  useEffect(() => {
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  const handleSearch = event => setSearchString(event.target.value)
  const searchResults = countries.filter(country => country.name.toLowerCase().includes(searchString.toLowerCase()))
  
  return (
    <div>
      <Search searchString = {searchString}
              handleSearch = {handleSearch} />
      <Display countries = {searchResults}
               searchString = {searchString}
               setSearchString = {setSearchString} />
    </div>
  )
}

export default App;