import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
    
        const anecdoteContent = event.target.anecdote.value
    
        if (anecdoteContent !== '') {
          event.target.anecdote.value = ''

          props.createAnecdote(anecdoteContent)
          props.showNotification(`New anecdote created: ${anecdoteContent}`, 3)

        //   dispatch(createAnecdote(anecdoteContent)) 
        //   dispatch(showNotification(`New anecdote created: ${anecdoteContent}`, 3))

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

const mapDispatchToProps = dispatch => {
    return {
        createAnecdote: value => {
            dispatch(createAnecdote(value)) 
        },
        showNotification: (msg, delay) => {
            dispatch(showNotification(msg, delay))
        }
    }
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm