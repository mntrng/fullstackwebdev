import React from 'react';
import Countries from './Countries';

const Display = ( {countries, searchString, setSearchString} ) => {
    if (countries.length > 10 && searchString.length !== 0) {
        return (
            <div>
                "Too many matches, specify another filter"
            </div>
        )
    } else if (countries.length <= 10 && searchString.length !== 0) {
        return (
        <div>
            <Countries countries = {countries} 
                       setSearchString = {setSearchString} />
        </div>
    )} else {
        return null;
    }
}

export default Display