import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const EditAuthor = ({ setError }) => {
    const [ name, setName ] = useState('')
    const [ birthYear, setBirthYear ] = useState('')
    const [ changeBirthYear ] = useMutation(EDIT_AUTHOR_BIRTHYEAR, {
        //refetchQueries: [{ query: ALL_AUTHORS }],
        onError: error => {
            setError(error.message)
        }
    })

    // useEffect(() => {
    //     if (result.data && result.data.editAuthor === null) {
    //         setError('Author not found')
    //     }
    // }, [result.data]) // eslint-disable-line

    const updateAuthor = async (event) => {
        event.preventDefault()

        const result = await changeBirthYear({ variables: { name, birthYear: Number(birthYear) } })
        if (result.data && result.data.editAuthor === null) {
            setError('Author not found')
        }

        setName('')
        setBirthYear('')
    }

    return (
        <div>
            <h2>Edit Birthyear</h2>
            <form onSubmit={updateAuthor}>
                <table>
                    <tbody>
                        <tr>
                            <td>Name: </td>
                            <td><input value={name} onChange={ ({ target }) => setName(target.value) }  /></td>
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

export default EditAuthor