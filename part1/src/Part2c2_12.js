import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const CountryFinder = () => {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const url = query !== '' ? `https://restcountries.eu/rest/v2/name/${query}` : 'https://restcountries.eu/rest/v2/all';

        setIsLoading(true);
        axios
        .get(url)
        .then(resp => {
            setCountries(resp.data);
            setIsLoading(false);
            setIsError(false);
        })
        .catch(err => {
            console.log('ERROR ENCOUNTERED:', err.response);
            setIsError(true);
        })
    }, [query])

   return (
       <>
            <h2>Country Finder</h2>
            <Search country={query} setCountry={setQuery}></Search>
            {isError && <div>No matching results found</div>}
            {query !== '' && !isLoading && !isError && <Countries countries={countries}></Countries>}            
       </>
   )
}

const Search = ({country, setCountry}) => {
   return (
       <div>
           Find Countries: <input value={country} onInput={(e) => setCountry(e.target.value)} />
       </div>
   )
}

const Countries = ({countries}) => {
    const [showCountry, setShowCountry] = useState('');

    if (countries.length > 10) {
        return (
            <div>Too many matches, please refine your search query</div>
        )
    }

    if (countries.length === 1) {
        return (
            <div>
                <Country country={countries[0]}></Country>
            </div>            
        )        
    }

    return (
        <div>
            <ul style={{listStyleType: 'none', padding: 0}}>
                {countries.map(country =>
                    <li style={{paddingBottom:'5px'}} key={country.area}>
                        {country.name}
                        <Button text='Show' clickHandler={() => setShowCountry(country.area)}></Button>
                        {country.area === showCountry && <Country country={country}></Country>}
                    </li>
                )}
            </ul>
        </div>
    )
}

const Country = ({country}) => {
   const [weather, setWeather]  = useState({});
   const {name, capital, population, languages, flag} = country;

   useEffect(() => {
       const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital},${name}`;
       let isMounted = true;

       axios
       .get(url)
       .then(resp => {
           if (isMounted) {
                setWeather(resp.data);
           }          
       })
       return () => { isMounted = false };
   }, [])
   
   if (Object.keys(weather).length > 0) {  //checking for empty object
        const {temperature, wind_speed, wind_dir, weather_icons} = weather.current;
        return (
            <>
                <h3>{name}</h3>
                <ul style={{listStyleType: 'none', padding: 0}}>
                    <li>Capital: {capital}</li>
                    <li>Population: {population}</li>
                </ul>
                <h4>Languages</h4>
                <ul>
                    {languages.map((lang, index) =>
                        <li key={index}>{lang.name}</li>
                    )}
                </ul>
                <img width='8%' src={flag}></img>
                <h4>Weather in {capital}</h4>
                <p><span style={{fontWeight:'bold'}}>Temperature:</span> {temperature} Celcius</p>
                {weather_icons.map((img, index) => 
                    <img key={index} src={img} />
                )}
                <p><span style={{fontWeight:'bold'}}>Wind:</span> {wind_speed} mph direction {wind_dir}</p>
            </>
        )
   } else {
       return <></>
   }   
}

const Button = ({ clickHandler, text }) => {
    return (
        <button style={{marginLeft: "5px"}} onClick={clickHandler}>
            {text}
        </button>
    )
}