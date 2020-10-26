import React from "react";
import FullCountry from "./FullCountry"

const Countries = ( {countries, setSearchString} ) => {

    const showInfo = country => setSearchString(country.name)

    if (countries.length > 1) {
        return (
            countries.map(country => (
                <div key = {country.callingCodes}> {country.name} {" "}
                <button onClick = {() => showInfo(country)}>Show</button>
                </div>
            )))
            
    } else if (countries.length === 1) {
        return (
            <div>
                <FullCountry country = {countries[0]} />
            </div>
        ) 
    } else {
        return null;
    }
}

export default Countries