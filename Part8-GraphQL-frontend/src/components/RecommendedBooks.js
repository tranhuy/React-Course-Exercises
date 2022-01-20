import React from 'react'
import { useQuery } from '@apollo/client'
import { LOGGED_IN_USER, ALL_BOOKS } from '../queries'


const RecommendedBooks = ({ show }) => {
    const currentUserResult = useQuery(LOGGED_IN_USER)   
    const booksResult = useQuery(ALL_BOOKS)

    if (!show) {
        return null
    }
    
    if (currentUserResult.loading || booksResult.loading) {
        return <div>loading recommendations...</div>
    }

    const user = currentUserResult.data.currentUser
    const books = booksResult.data.allBooks.filter(book => book.genres.includes(user.favoriteGenre))
    
    return (
        <div>
            <h2>Recommendations from {user.username}</h2>
            <div>Books in your favorite genre <strong>{user.favoriteGenre}</strong></div>
            <table style={{ marginTop: 5, marginBottom: 10 }}>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                    Author
                    </th>
                    <th>
                    Published
                    </th>
                </tr>
                {books.map(a =>
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default RecommendedBooks