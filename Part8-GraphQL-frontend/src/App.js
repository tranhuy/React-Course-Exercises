
import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import RecommendedBooks from './components/RecommendedBooks'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notification from './components/Notification'

const App = () => {
  const [page, setPage] = useState('authors')
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

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
    setPage('authors')
    client.resetStore()
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
      />

      <NewBook
        show={page === 'add'} 
        setError={notify}
      />

      <Login
        show={page === 'login'} 
        setToken={setToken}
        setError={notify}
      />

    </div>
  )
}

export default App