import React from 'react'

const Search = ( {searchString, handleSearch} ) => {
    return (
    <div>Find countries: <input value = {searchString} 
                                onChange = {handleSearch} />
    </div>
    )
}

export default Search