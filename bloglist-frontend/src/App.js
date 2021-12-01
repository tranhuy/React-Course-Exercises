import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''}) 
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({message : null, isError : false})

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((b1, b2) => (b1.likes > b2.likes) ? 1: -1))
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = (val) => {
    setUsername(val)
  }

  const handlePasswordChange = (val) => {
    setPassword(val)
  }

  const loginUser = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
        setNotification({ message: 'Invalid Credentials', isError: true })
    }
  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  // javascript currying function
  const addNewBlog = async (newBlog, event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create(newBlog)

      setBlogs(blogs.concat(blog))
      setNotification({ message: `New Blog: ${blog.title} by ${blog.author} was successfully added`, isError: false })
      blogFormRef.current.toggleVisibility()
    } catch (err) {
      setNotification({ message: err.message, isError: true })
      console.log(err)
    }
  }

  const updateBlog = async (modifiedBlog) => {
    try {
      const blog = await blogService.updateBlog(modifiedBlog.id, modifiedBlog)
      return blog
    } catch (err) {
      console.log(err)
    }
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      const blog = await blogService.deleteBlog(blogToDelete.id)
      setBlogs(blogs.filter(blog => blog != blogToDelete))
    } catch (err) {
      setNotification({ message: err.message, isError: true })
      console.log(err)
    }
  }

  let blogActions = {
    update : updateBlog,
    delete: deleteBlog
  }

  if (user === null) {
    return (
      <>
        <Notification message={notification.message} isError={notification.isError} displayMessage={setNotification}></Notification>
        <LoginForm handleSubmit={loginUser} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} username={username} password={password}></LoginForm>
      </>
    )
  } else {
    return (
      <>
        <Notification message={notification.message} isError={notification.isError} displayMessage={setNotification}></Notification>
        <div>
          <h2>blogs</h2>
          <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'pre-wrap' }}>
            <h4>{user.name} logged in </h4>
            <button onClick={logoutUser}>Logout</button>
          </div>

          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
              <BlogForm submitAction={addNewBlog}></BlogForm>
          </Togglable>
          
          <section style={{marginTop: '10px'}}>
            {blogs.map(blog => 
              <Blog key={blog.id} blog={blog} blogActions={blogActions} canDelete={user.id == blog.user.id} />
            )}
          </section>
        </div>       
      </>
    )
  }
}

const Notification = ({message, isError, displayMessage}) => {
  const error = {
       color: 'red',
       background: 'lightgrey',
       fontSize: '20px',
       borderStyle: 'solid',
       borderRadius: '5px',
       padding: '10px',
       marginBottom: '10px'
  }

  const info = {
       color: 'green',
       background: 'lightgrey',
       fontSize: '20px',
       borderStyle: 'solid',
       borderRadius: '5px',
       padding: '10px',
       marginBottom: '10px'
  }

  if (message == null) return null;

  setTimeout(() => {
      displayMessage({ message: null });
  }, 3000);

  return (
      <div id='alert' style={isError ? error : info}>
          {message}
      </div>
  )
}

export default App