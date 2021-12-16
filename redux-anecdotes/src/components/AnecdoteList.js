import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementVotes, orderByVotes } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
            return !state.filter ? state.anecdotes : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))        
        })

    const dispatch = useDispatch()

    const vote = (id, content) => {
        console.log('vote', id)
    
        dispatch(incrementVotes(id))
        dispatch(orderByVotes())

        showNotification(dispatch, `You voted for ${content}`)
        // dispatch(setNofication(`You voted for ${content}`))

        // setTimeout(() => {
        //     dispatch(removeNotification())
        // }, 3000);
    }
   return (
       <>
        {
            anecdotes.length > 0 ? anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        <span>has {anecdote.votes} </span>
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>)
            : 'No Results Found'
        }
       </>
   )
}

export default AnecdoteList