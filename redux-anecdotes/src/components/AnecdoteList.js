import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote, orderByVotes } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    let searchFilter;

    const anecdotes = useSelector(({filter, anecdotes}) => {
            searchFilter = filter
            return !filter ? anecdotes : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))        
        })

    const vote = async (anecdote) => {
        console.log('vote', anecdote.id)
    
        //since voteAnecdote uses thunk, need to wait for it to complete first before dispatching SORT_BY_VOTES and DISPLAY_NOTIFICATION actions
        await dispatch(voteAnecdote(anecdote))
        dispatch(orderByVotes())
        dispatch(showNotification(`You voted for ${anecdote.content}`, 3))

        //showNotification(dispatch, `You voted for ${anecdote.content}`)
        
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
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>)
            : searchFilter ? 'No Results Found' : ''
        }
       </>
   )
}

export default AnecdoteList