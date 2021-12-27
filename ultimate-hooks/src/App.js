  
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const attributes = {
    type, value, onChange
  }

  return {
    attributes,
    reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  
  useEffect(() => {
    axios.get(baseUrl)
      .then(resp => {
        setResources(resp.data)
      })
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps 

  const create = (resource) => {
    axios.post(baseUrl, resource)
      .then(resp => {
        setResources(resources.concat(resp.data))
      })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.attributes.value })
    content.reset()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.attributes.value, number: number.attributes.value})
    name.reset()
    number.reset()
  }

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.attributes} /> <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <table>
          <tbody>
            <tr><td>Name: </td><td><input {...name.attributes} /></td></tr>
            <tr><td>Number: </td><td><input {...number.attributes} /></td></tr>
          </tbody>
        </table>
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App