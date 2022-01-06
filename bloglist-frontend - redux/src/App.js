import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useHistory } from 'react-router-dom'

//components
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import Notification from './components/Notification'

//reducers
import { initializeBlogs } from './reducers/blogReducer'
import { setUserToken, logout } from './reducers/userReducer'

//services
import userService from './services/users'

const App = () => {
  const [users, setUsers] = useState([])
  const user = useSelector(state => state.user) 
  const dispatch = useDispatch()
  const history = useHistory()
  const togglableRef = useRef()

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogUser')

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUserToken(user))  
      dispatch(initializeBlogs())   
    }       
  }, [])

  useEffect(() => {
    userService.getAll().then(users => 
        setUsers(users)
    )
}, [])

  const logoutUser = () => {
    dispatch(logout())
  }

  return (
    <>
      <Notification />
      {
        user === null ? 
          <LoginForm /> :
          <div>
              <h2>blogs</h2>
              <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'pre-wrap' }}>
                <h4>{user.name} logged in </h4>
                <Link to='/'>
                    <button onClick={logoutUser}>Logout</button>
                </Link>              
              </div>
              <Switch>
                <Route exact path="/">
                    <Togglable buttonLabel="Create New Blog" ref={togglableRef}>
                      <BlogForm togglableRef={togglableRef} />
                    </Togglable>             
                    <BlogList loggedInUserId={user.id} />
                </Route>
                <Route exact path="/users">
                    <UserList users={users} />
                </Route>   
                <Route exact path="/users/:id">
                    {<UserDetails users={users} />}
                </Route>            
              </Switch>
              
          </div>       
      }
    </>
  )
}

export default App