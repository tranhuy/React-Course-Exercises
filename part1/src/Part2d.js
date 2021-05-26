import React, { useState, useEffect } from 'react'
import contactsService from './Services/contactsService'

const Part2d = () => {
  const [ persons, setPersons ] = useState([]);
  const [ searchCriteria, setSearchCriteria ] = useState(''); 
  const [ notification, setNotification ] = useState({message : null, isError : false});

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
      <Notification message={notification.message} isError={notification.isError} displayMessage={setNotification}></Notification>
      <SearchForm criteria={searchCriteria} updateSearch={updateSearch}></SearchForm>
      <h3>Add New Contact</h3>
      <PersonForm persons={persons} updatePersons={updatePersons} displayMessage={setNotification} />
      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow} updatePersons={updatePersons} displayMessage={setNotification}></Persons>
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

const PersonForm = ({persons, updatePersons, displayMessage}) => {
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
                        displayMessage({ message : `The phone number for contact ${newName} was successfully updated`, isError : false });
                    })
                    .catch(err => {
                        contactsService.getContacts().then(contacts => updatePersons(contacts));
                        displayMessage({ message : `Contact ${newName} has already been removed from server`, isError : true });
                    })
                    .finally(() => {
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
                displayMessage({ message : `${newName} was successfully added to the phonebook`, isError : false });
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

const Persons = ({contactsToShow, updatePersons, displayMessage}) => {
    const deletePerson = (id, name) => {
        if (window.confirm(`Do you wish to delete ${name}?`)) {
            contactsService.deleteContact(id)
                .then(() => {                   
                    displayMessage({ message : `${name} was successfully deleted`, isError : false });
                })
                .catch(err => {
                    displayMessage({ message : `Contact ${name} has already been removed from server`, isError : true});
                })
                .finally(() => updatePersons(contactsToShow.filter(contact => contact.id !== id)));
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

const Notification = ({message, isError, displayMessage}) => {
   const error = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
   }

   const info = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
   }

   if (message == null) return null;

   setTimeout(() => {
       displayMessage({ message: null });
   }, 3000);

   return (
       <div id='alert' style={isError ? error : info}>
           {message}
       </div>
   )
}

export default Part2d