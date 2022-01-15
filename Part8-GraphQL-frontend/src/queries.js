import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author
            published
        }
    }
`

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ) {
            title
            published
            author
        }
    }
`
export const EDIT_AUTHOR_BIRTHYEAR = gql`
    mutation editAuthorBirthYear($name: String!, $birthYear: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $birthYear
        ) {
            name
            born
            id
        }
    }
`