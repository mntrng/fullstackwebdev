import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'

const BlogForm = ({ handleBlogAddition }) => {

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    handleBlogAddition({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })

    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <TextField required label="Title" variant="filled" size="small" 
                 type="text" value={blogTitle} id="title"
                 onChange={({ target }) => setBlogTitle(target.value)} /> <br />
      <TextField required label="Author" variant="filled" size="small" 
                 type="text" value={blogAuthor} id="author"
                 onChange={({ target }) => setBlogAuthor(target.value)} /> <br />
      <TextField required label="URL" variant="filled" size="small" 
                 type="text" value={blogUrl} id="url"
                 onChange={({ target }) => setBlogUrl(target.value)} /> <br />

      <Button variant="contained" type="submit" color="primary" style={{ marginTop: 15 }}>Create</Button>
    </form>
  )
}

export default BlogForm