import React, { useState } from 'react'

const Blog = ({blog, blogActions, canDelete}) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false)
  const [currentBlog, setCurrentBlog] = useState(blog)

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

const incrementLikes = () => {
  setCurrentBlog(blogActions.update({...blog, user: blog.user.id, likes: ++blog.likes}))
}

const deleteBlog = () => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
    blogActions.delete(blog)
  }
}

return (
  <div className='blog' style={blogStyle}>
    {
      showBlogDetails ? 
        <table>
          <tr className='title'><td>{blog.title}</td></tr>
          <tr className='url'><td>{blog.url}</td></tr>
          <tr className='likes'><td>{blog.likes} <button onClick={incrementLikes}>Like</button></td></tr>
          <tr className='author'><td>{blog.author}</td></tr>
          {canDelete && <tr><td><button onClick={deleteBlog}>Delete Blog</button></td></tr>}
        </table>
      : <table>
          <tr className='title'><td>{blog.title}</td><td>{blog.author}</td></tr>
        </table>
    }
    <div><button data-cy='toggleDetails' onClick={toggleDetails}>{showBlogDetails ? "Hide" : "View"}</button></div>
  </div>  
)}

export default Blog