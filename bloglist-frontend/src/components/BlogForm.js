import React, { useState } from 'react'

const BlogForm = ({ submitAction }) => {
    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})    
  
    return (
        <>
            <h3>Create New Blog</h3>
            <form onSubmit={submitAction(newBlog)} style={{marginBottom: '10px'}}>
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

export default BlogForm