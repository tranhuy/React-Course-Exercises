import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR_BIRTHYEAR } from '../queries'

const EditAuthorSelect = ({ authors, setError }) => {
    const [ name, setName ] = useState(authors[0].name)
    const [ birthYear, setBirthYear ] = useState('')
    const [ changeBirthYear ] = useMutation(EDIT_AUTHOR_BIRTHYEAR, {
        //refetchQueries: [{ query: ALL_AUTHORS }],
        onError: error => {
            setError(error.message)
        }
    })

    const updateAuthor = async (event) => {
        event.preventDefault()

        const result = await changeBirthYear({ variables: { name, birthYear: Number(birthYear) } })
        if (result.data && result.data.editAuthor === null) {
            setError('Author not found')
        }

        setName(authors[0].name)
        setBirthYear('')
    }

    return (
    <div>
        <h2>Edit Birthyear</h2>
        <form onSubmit={updateAuthor}>
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <select style={{ width: '100%' }} value={name} onChange={ ({target} ) => setName(target.value) }>
                                {authors.map(author =>
                                    <option key={author.id} value={author.name}>{author.name}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Birth Year: </td>
                        <td><input value={birthYear} onChange={ ({ target }) => setBirthYear(target.value) } /></td>
                    </tr>
                    <tr>
                        <td>
                            <button>Update Author</button>
                        </td>
                </tr>
                </tbody>
            </table>
        </form>
    </div>  
    )
}

export default EditAuthorSelect