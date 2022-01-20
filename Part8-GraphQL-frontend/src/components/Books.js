import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('all genres')

  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading books...</div>
  }

  const allBooks = result.data.allBooks
  const books = selectedGenre === 'all genres' ? allBooks : allBooks.filter(book => book.genres.includes(selectedGenre))
  const genres = [...new Set(allBooks.map(book => book.genres).flat())]

  return (
    <div>
      <h2>Books</h2>
      <div>In genre <strong>{selectedGenre}</strong></div>
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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {
              genres.map((genre, index) => 
                  <button key={index} onClick={() => setSelectedGenre(genre)}>{genre}</button>
              )
            }
            <button onClick={() => setSelectedGenre('all genres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books