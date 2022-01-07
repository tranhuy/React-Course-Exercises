import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useField } from '../hooks'
import { login } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'


const LoginForm = () => {
    const { reset: resetUsernae, ...username } = useField('text')
    const { reset: resetPassword, ...password } = useField('password')
    const dispatch = useDispatch()
    
    const loginUser = async (event) => {
      event.preventDefault()

      try {
        await dispatch(login(username.value, password.value))
        dispatch(initializeBlogs())
      } catch (err) {
        dispatch(showNotification('Invalid Credentials', true, 3))
      }
    }

    return (
        <>
          <h2>User Login</h2>
          <form onSubmit={loginUser}>
              <table>
                <tbody>
                  <tr>
                    <td>Username:</td>
                    <td><input {...username} /></td>
                  </tr>
                  <tr>
                    <td>Password:</td>
                    <td><input {...password} /></td>
                  </tr>
                </tbody>
              </table>
              <button type="submit">Login</button>
          </form>
        </>
    )
}

export default LoginForm