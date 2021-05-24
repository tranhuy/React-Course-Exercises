import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Part2b = () => {
  const [ persons, setPersons ] = useState([]);

  const [ searchCriteria, setSearchCriteria ] = useState(''); 

  const contactsToShow = searchCriteria === '' ? persons : persons.filter(person => person.name.toLowerCase().startsWith(searchCriteria.trim().toLowerCase()));

  const updatePersons = (newPersons) => {
      setPersons(newPersons);
  }

  const updateSearch = (e) => {
    setSearchCriteria(e.target.value)  
  }

  useEffect(() => {
      axios
      .get('http://localhost:3001/persons')
      .then(response => {setPersons(response.data)})
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchForm criteria={searchCriteria} updateSearch={updateSearch}></SearchForm>
      <h3>Add New Contact</h3>
      <PersonForm persons={persons} updatePersons={updatePersons} />
      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow}></Persons>
    </div>
  )
}

const SearchForm = ({criteria, updateSearch}) => {
   return (
       <>
           Filter contact name: <input value={criteria} onChange={(e) => updateSearch(e)} />
       </>
   )
}

const PersonForm = ({persons, updatePersons}) => {
   const [ newName, setNewName ] = useState('');
   const [ newPhone, setNewPhone ] = useState('');

   const addToPhonebook = (event) => {
        event.preventDefault();

        if (persons.filter(p => p.name == newName).length > 0) {
            alert(`${newName} is already added to the phonebook`);
            return;
        }

        const newPerson = {
            id: persons.length + 1,
            name: newName,
            phone: newPhone
        }
        updatePersons(persons.concat(newPerson));
        setNewName('');
        setNewPhone('');
    }   

   return (
       <>
           <form onSubmit={addToPhonebook}>
                <div>
                <p>Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} /></p>
                <p>Phone: <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} /></p>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
       </>
   )
}

const Persons = ({contactsToShow}) => {
   return (
       <>
           <ul style={{listStyleType: 'none', padding: 0}}>
                {contactsToShow.map(person => 
                    <Person key={person.id} name={person.name} phone={person.phone}></Person>
                )}
            </ul> 
       </>
   )
}

const Person = ({name, phone}) => {
   return (
       <>
           <li>{name}: {phone}</li>
       </>
   )
}

export default Part2b