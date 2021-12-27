import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const url = `https://restcountries.com/v2/name/${name}?fullText=true`
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      axios.get(url)
        .then(resp => {
          if (resp.data.status === 404){
            setCountry({ found: false})
          } else {
            setCountry({...resp.data.shift(), found: true})
          }          
        })
        .catch(err => {
          setCountry(null)
        })
    }   
  }, [name]) // eslint-disable-line react-hooks/exhaustive-deps  

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} /> <button>Find Country</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
