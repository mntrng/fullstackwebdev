import React from 'react'

const Filter = ( {searchString, handleSearch} ) => {
    return (
    <div>Search: <input value = {searchString} 
                        onChange = {handleSearch} />
    </div>
    )
}

export default Filter