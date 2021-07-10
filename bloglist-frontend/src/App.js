import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ notification, setNotification ] = useState({message : null, isError : false})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const loginForm = () => { 
    return (
        <>
            <Notification message={notification.message} isError={notification.isError} displayMessage={setNotification}></Notification>
            <h2>User Login</h2>
            <form onSubmit={loginUser}>
                <table>
                  <tr>
                    <td>Username:</td>
                    <td><input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} /></td>
                  </tr>
                  <tr>
                    <td>Password:</td>
                    <td><input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} /></td>
                  </tr>
                </table>
                <button type="submit">Login</button>
            </form>
        </>
    )
  }

  if (user === null) {
    return loginForm()
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
          <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification}></BlogForm>
          <section style={{marginTop: '10px'}}>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </section>
        </div>       
      </>
    )
  }
}

const BlogForm = ({ blogs, setBlogs, setNotification }) => {
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

  const addNewBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create(newBlog)

      setBlogs(blogs.concat(blog))
      setNewBlog({title: '', author: '', url: ''})
      setNotification({ message: `New Blog: ${blog.title} by ${blog.author} was successfully added`, isError: false })
    } catch (err) {
      setNotification({ message: err.message, isError: true })
      console.log(err)
    }
  }

  return (
      <>
          <h3>Create New Blog</h3>
          <form onSubmit={addNewBlog}>
            <table>
                <tr>
                  <td>Title:</td>
                  <td><input type="text" value={newBlog.title} name="Title" onChange={({target}) => setNewBlog({...newBlog, title: target.value})} /></td>
                </tr>
                <tr>
                  <td>Author:</td>
                  <td><input type="text" value={newBlog.author} name="Author" onChange={({target}) => setNewBlog({...newBlog, author: target.value})} /></td>
                </tr>
                <tr>
                  <td>Url:</td>
                  <td><input type="text" value={newBlog.url} name="Url" onChange={({target}) => setNewBlog({...newBlog, url: target.value})} /></td>
                </tr>
              </table>
              <button type="submit">Create</button>
          </form>
      </>
  )
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