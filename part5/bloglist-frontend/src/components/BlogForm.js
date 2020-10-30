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
      <div>
            Title
        <input
          type="text" value={blogTitle} id="title" name="Title"
          onChange={({ target }) => setBlogTitle(target.value)} />
      </div>
      <div>
            Author
        <input
          type="text" value={blogAuthor} id="author" name="Author"
          onChange={({ target }) => setBlogAuthor(target.value)} />
      </div>
      <div>
            URL
        <input
          type="text" value={blogUrl} id="url" name="Url"
          onChange={({ target }) => setBlogUrl(target.value)} />
      </div>
      <button type="submit" id="createB">Create</button>
    </form>
  )
}

export default BlogForm