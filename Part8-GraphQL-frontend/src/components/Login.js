import React, { useState, useRef } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { LOGIN_USER, LOGGED_IN_USER } from '../queries'

const Login = ({ show, setToken, setError }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const client = useApolloClient()
    const usernameRef = useRef()

    const [login, result] = useMutation(LOGIN_USER, {
        onError: (error) => {
            setError(error.message)
            usernameRef.current.focus()
        },
        onCompleted: (data) => {
            const token = data.login.value 
            setToken(token)       
            localStorage.setItem('libraryApp-user-token', token)
            //need to refetch this query after setting token so that it can be added to authorization header
            client.refetchQueries({ include: [LOGGED_IN_USER] })
        }
    })

    if (!show) {
        return null
    }

    const loginUser = async (event) => {
        event.preventDefault()

        const result = await login({ variables: { username, password } })

        // if (result.data && result.data.login) {
        //     const token = result.data.login.value    
        //     setToken(token)       
        //     localStorage.setItem('libraryApp-user-token', token)            
        // }
        
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={loginUser}>
                <div>username: <input value={username} onChange={({target}) => setUsername(target.value)} ref={usernameRef} autoFocus /></div>
                <div>password: <input type='password' value={password} onChange={({target}) => setPassword(target.value)} /></div>
                <button>login</button>
            </form>
        </div>
    )
}

export default Login

