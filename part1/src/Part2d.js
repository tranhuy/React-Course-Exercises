import React, { useState, useEffect } from 'react'
import contactsService from './Services/contactsService'

const Part2d = () => {
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
      contactsService.getContacts()
        .then(contacts => setPersons(contacts))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchForm criteria={searchCriteria} updateSearch={updateSearch}></SearchForm>
      <h3>Add New Contact</h3>
      <PersonForm persons={persons} updatePersons={updatePersons} />
      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow} updatePersons={updatePersons}></Persons>
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

        const contact = persons.find(p => p.name === newName);

        if (contact) {
            if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with the new one?`)) {
                contactsService.updateContact(contact.id, {...contact, phone : newPhone})
                    .then(returnedContact => {
                        updatePersons(persons.map(p => p.id !== contact.id ? p : returnedContact));
                        setNewName('');
                        setNewPhone('');
                    })
            }
            return;
        }

        const newPerson = {
            name: newName,
            phone: newPhone
        }

        contactsService.addContact(newPerson)
            .then(newContact => {
                updatePersons(persons.concat(newContact));
                setNewName('');
                setNewPhone('');
            })
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

const Persons = ({contactsToShow, updatePersons}) => {
    const deletePerson = (id, name) => {
        if (window.confirm(`Do you wish to delete ${name}?`)) {
            contactsService.deleteContact(id)
                .then(() => {
                    updatePersons(contactsToShow.filter(contact => contact.id !== id));
                })
        }
   }
   
   return (
       <>
           <ul style={{listStyleType: 'none', padding: 0}}>
                {contactsToShow.map(person => 
                    <Person key={person.id} name={person.name} phone={person.phone} deletePerson={() => deletePerson(person.id, person.name)}></Person>
                )}
            </ul> 
       </>
   )
}

const Person = ({name, phone, deletePerson}) => {
   return (
       <>
           <li style={{paddingBottom:'5px'}}>{name}: {phone} <button onClick={deletePerson}>DELETE</button></li>
       </>
   )
}

export default Part2d