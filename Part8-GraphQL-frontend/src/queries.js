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
            author {
                name
            }
            published
            genres
        }
    }
`

export const BOOKS_BY_GENRE = gql`
    query findByGenre($genre: String) {
        allBooks(
            genre: $genre
        ) {
            title
            author {
                name
            }
            published
            genres
        }
    }
`

export const LOGGED_IN_USER = gql`
    query {
        currentUser {
            username
            favoriteGenre
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
            author {
                name
            }
            genres
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

export const LOGIN_USER = gql`
    mutation loginUser($username: String!, $password: String!) {
        login(
            username: $username,
            password: $password
        ) {
            value
        }
    }
`