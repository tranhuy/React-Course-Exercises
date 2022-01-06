import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { deleteBlog, likeBlog, sortByLikes } from '../reducers/blogReducer'

const Blog = ({ blogs }) => {
  //const [showBlogDetails, setShowBlogDetails] = useState(false)
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

  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  if (!blog) {
      return null
  }

const toggleDetails = () => {
  setShowBlogDetails(!showBlogDetails)
}

const incrementLikes = async () => {
  try {
    await dispatch(likeBlog({...blog, likes: ++blog.likes}))
    //dispatch(sortByLikes())
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

const setHttp = url => {
  if (url.search(/^http[s]?\:\/\//) == -1) {
      url = 'http://' + url;
  }
  
  return url;
}

return (
  <div className='blog'>
    <table>
          <tbody>
            <tr className='title'><td style={{fontSize: '25px', fontWeight: 'bold'}}>{blog.title}</td></tr>
            <tr style={{height: 10}}></tr>
            <tr className='url'><td><a href={setHttp(blog.url)}>{blog.url}</a></td></tr>
            <tr className='likes'><td>{blog.likes} likes <button onClick={incrementLikes}>Like</button></td></tr>
            <tr className='author'><td>Added By: {blog.author}</td></tr>
          </tbody>
      </table>
  </div>  
)}

export default Blog