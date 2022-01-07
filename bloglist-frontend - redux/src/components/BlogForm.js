import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const BlogForm = ({ togglableRef }) => {
    const { reset: resetTitle, ...title } = useField('text')
    const { reset: resetAuthor, ...author } = useField('text')
    const { reset: resetUrl, ...url } = useField('text')

    const dispatch = useDispatch()

    const addNewBlog = async (event) => {
      event.preventDefault()
  
      try {
        let newBlog = {
          title: title.value,
          author: author.value,
          url: url.value
        }

        await dispatch(createBlog(newBlog))  
        dispatch(showNotification(`New Blog: ${newBlog.title} by ${newBlog.author} was successfully added`, false, 3))
        togglableRef.current.toggleVisibility()
      } catch (err) {
        dispatch(showNotification(err.message, true, 3))
        console.log(err)
      }
    }

    return (
        <>
            <h3>Create New Blog</h3>
            <form onSubmit={addNewBlog} style={{marginBottom: '10px'}}>
              <table>
                <tbody>
                    <tr>
                      <td>Title:</td>
                      <td><input id="title" {...title} /></td>
                    </tr>
                    <tr>
                      <td>Author:</td>
                      <td><input id="author" {...author} /></td>
                    </tr>
                    <tr>
                      <td>Url:</td>
                      <td><input id="url" {...url} /></td>
                    </tr>
                  </tbody>
                </table>
                <button type='submit'>Create</button>
            </form>
        </>
    )
}

export default BlogForm