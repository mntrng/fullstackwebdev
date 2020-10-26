import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FullCountry = ( {country} ) => {
    
    const [ weather, setWeather ] = useState({})
    const api = "d0de84045c3d4fcd2cf6142102575f88"

    useEffect(() => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api}&units=metric`

        axios
            .get(apiUrl)
            .then(response => {
            setWeather({
                temperature: response.data.main.temp,
                humidity: response.data.main.humidity,
                wind: response.data.wind.speed,
                icon: response.data.weather[0].icon
            })
        })
    }, [country.capital])

    return (

        <div>
            <h1>{country.name}</h1>
            <p>
                <strong>Capital:</strong> {country.capital} <br />
                <strong>Population:</strong> {country.population}
            </p>
            <div>
                <h4>Languages</h4>
                <ul>
                    {country.languages.map(language => <li key = {language.name}>{language.name}</li>)}
                </ul>
                <img src = {country.flag} alt = {`${country.name} flag`} width = {300} border = "1"/>   
            </div>
            <div>
                <h4>Weather in {country.capital}</h4>
                Temperature: {weather.temperature} &#8451;<br />
                Humidity: {weather.humidity} %<br />
                Wind Speed: {weather.wind} m/s<br />
                <img src = {`http://openweathermap.org/img/w/${weather.icon}.png`} alt = "weather" width = {80}/>
            </div>
        </div>
    )
}

export default FullCountry