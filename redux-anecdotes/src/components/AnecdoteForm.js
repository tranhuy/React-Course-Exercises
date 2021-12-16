import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
    
        const anecdoteContent = event.target.anecdote.value
    
        if (anecdoteContent !== '') {
          event.target.anecdote.value = ''
          dispatch(createAnecdote(anecdoteContent)) 
          showNotification(dispatch, `New anecdote created: ${anecdoteContent}`)

        //   dispatch(setNofication(`New anecdote created: ${anecdoteContent}`))   

        //   setTimeout(() => {
        //       dispatch(removeNotification())
        //   }, 3000);
        }    
    }

   return (
       <>
            <h2>Create New</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /> <button>create</button></div>                
            </form>
       </>
   )
}

export default AnecdoteForm