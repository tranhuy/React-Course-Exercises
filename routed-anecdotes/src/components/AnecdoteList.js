import { Link } from "react-router-dom"

const AnecdoteList = ({ anecdotes }) => {
    const anecdotesListStyle = {
        listStyleType: 'none',
        paddingInlineStart: '10px'
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul style={anecdotesListStyle}>
                {anecdotes.map(anecdote => 
                                <li key={anecdote.id}>
                                    <Link to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                                </li>)}
            </ul>
        </div>
    )
}

export default AnecdoteList