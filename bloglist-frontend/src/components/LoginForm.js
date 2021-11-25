import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
   return (
       <>
           <h2>User Login</h2>
            <form onSubmit={handleSubmit}>
                <table>
                  <tr>
                    <td>Username:</td>
                    <td><input type="text" value={username} name="Username" onChange={({target}) => handleUsernameChange(target.value)} /></td>
                  </tr>
                  <tr>
                    <td>Password:</td>
                    <td><input type="password" value={password} name="Password" onChange={({target}) => handlePasswordChange(target.value)} /></td>
                  </tr>
                </table>
                <button type="submit">Login</button>
            </form>
       </>
   )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm