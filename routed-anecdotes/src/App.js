import React, { useState } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import About from './components/About'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState({message : null, isError : false})
  const history = useHistory()

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification({ message: `New Anecdote: ${anecdote.content} was successfully created`, isError: false })
    history.push('/')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(anecdote => anecdote.id === match.params.id) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification.message} isError={notification.isError} displayMessage={setNotification}></Notification>
      <Switch>
        <Route exact path="/">
            <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route exact path="/anecdotes/:id">
            <Anecdote anecdote={anecdote}></Anecdote>
        </Route>
        <Route exact path="/About">
            <About />
        </Route>
        <Route exact path="/Create">
            <CreateNew addNew={addNew} />
        </Route>
      </Switch>

      <Footer />
    </div>
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

export default App;