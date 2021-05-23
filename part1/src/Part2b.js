import React, { useState } from 'react'

const Part2b = () => {
  const [ persons, setPersons ] = useState([
    { 
        id: 1,
        name: 'Arto Hellas',
        phone: '416-967-1111' 
    },
    { 
        id: 2,
        name: 'arto Hellas',
        phone: '647-422-5435' 
    },
    { 
        id: 3,
        name: 'Aerial Hellas',
        phone: '905-664-7765' 
    },
    { 
        id: 4,
        name: 'Huy Tran',
        phone: '647-543-2221' 
    }
  ]); 

  const [ searchCriteria, setSearchCriteria ] = useState(''); 

  const contactsToShow = searchCriteria === '' ? persons : persons.filter(person => person.name.toLowerCase().startsWith(searchCriteria.trim().toLowerCase()));

  const updatePersons = (newPersons) => {
      setPersons(newPersons);
  }

  const updateSearch = (e) => {
    setSearchCriteria(e.target.value)  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchForm criteria={searchCriteria} updateSearch={updateSearch}></SearchForm>
      <h3>Add New Contact</h3>
      <PersonForm persons={persons} updatePersons={updatePersons} />
      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow}></Persons>

      {/* Filter contact name: <input value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)} />
      <h3>Add New Contact</h3>
      <form onSubmit={addToPhonebook}>
        <div>
          <p>Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} /></p>
          <p>Phone: <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} /></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{listStyleType: 'none', padding: 0}}>
        {contactsToShow.map(person => 
            <Person key={person.id} name={person.name} phone={person.phone}></Person>
        )}
      </ul>      */}
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