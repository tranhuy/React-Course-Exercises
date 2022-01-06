import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { deleteBlog, likeBlog, sortByLikes } from '../reducers/blogReducer'

const Blog = ({blog, canDelete}) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    padding: 6,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  }

const toggleDetails = () => {
  setShowBlogDetails(!showBlogDetails)
}

const incrementLikes = async () => {
  try {
    await dispatch(likeBlog({...blog, likes: ++blog.likes}))
    dispatch(sortByLikes())
  } catch (err) {
    console.log(err)
  } 
}

const removeBlog = () => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
    try {
      dispatch(deleteBlog(blog.id))
    } catch (err) {
      console.log(err)
    }  
  }
}

return (
  <div className='blog' style={blogStyle}>
    {
      showBlogDetails ? 
        <table>
          <tbody>
            <tr className='title'><td>{blog.title}</td></tr>
            <tr className='url'><td>{blog.url}</td></tr>
            <tr className='likes'><td>{blog.likes} <button onClick={incrementLikes}>Like</button></td></tr>
            <tr className='author'><td>{blog.author}</td></tr>
            {canDelete && <tr><td><button onClick={removeBlog}>Delete Blog</button></td></tr>}
          </tbody>
        </table>
      : <table>
          <tbody>
            <tr className='title'><td>{blog.title}</td><td>{blog.author}</td></tr>
          </tbody>          
        </table>
    }
    <div><button data-cy='toggleDetails' onClick={toggleDetails}>{showBlogDetails ? "Hide" : "View"}</button></div>
  </div>  
)}

export default Blog