
import React, { useState, useEffect, useRef } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import RecommendedBooks from './components/RecommendedBooks'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notification from './components/Notification'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()
  const newBookRef = useRef()

  useEffect(() => {
    const loggedInUserToken = localStorage.getItem('libraryApp-user-token')

    if (loggedInUserToken) {
      setToken(loggedInUserToken)
    }
  }, [])

  //go to authors page after user logs in or logs out
  useEffect(() => {
    setPage('authors')
  }, [token])

  const notify = message => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 3000);
  }

  const logout = () => {   
    localStorage.clear()
    setToken(null)
    setUser(null)
    setPage('authors')
    client.resetStore()
    newBookRef.current.clearFormFields()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token ? 
              <>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('recommend')}>author picks</button>
                <button onClick={logout}>logout</button>
              </> : 
              <button onClick={() => setPage('login')}>login</button>
        }      
      </div>
      <Notification errorMessage={error} />
      <Authors
        show={page === 'authors'}
        isLoggedIn={token !== null}
        setError={notify}
      />

      <Books
        show={page === 'books'}
        isLoggedIn={token !== null}
      />

      <RecommendedBooks
        show={page === 'recommend'}
        user={user}
      />

      <NewBook
        show={page === 'add'} 
        user={user}
        setError={notify}
        ref={newBookRef}
      />

      <Login
        show={page === 'login'} 
        setUser={setUser}
        setToken={setToken}
        setError={notify}
      />

    </div>
  )
}

export default App