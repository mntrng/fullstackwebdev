import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDeleteBlog, user }) => {

  const [displayAll, setDisplayAll] = useState(false)

  const hideWhenVisible = { display: displayAll ? 'none' : '' }
  const showWhenVisible = { display: displayAll ? '' : 'none' }

  const toggleDisplayState = () => {
    setDisplayAll(!displayAll)
  }

  const addLike = event => {
    event.preventDefault()
    const newBlogObject = { ...blog, likes: blog.likes + 1 }

    handleLike(newBlogObject)
  }

  const deleteBlog = event => {
    event.preventDefault()

    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      handleDeleteBlog(blog.id)
    }
  }

  const displayDeleteButton = () => {
    if (user.username === blog.user.username) {
      return (
        <div>
          <button id='deleteB' onClick={deleteBlog}>Delete</button>
        </div>
      )
    }
  }

  const styling = {
    border: 'solid 1px',
    borderRadius: '5px',
    padding: '5px',
    marginBottom: '10px',
    width: '40%'
  }

  return (
    <div style={styling}>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author} <button id='viewB' onClick={toggleDisplayState}>View</button>
      </div>

      <div style={showWhenVisible}>
        {blog.title} by {blog.author} <button id='hideB' onClick={toggleDisplayState}>Hide</button> <br/>
        URL: {blog.url} <br/>
        Likes: {blog.likes} <button id='likeB' onClick={addLike}>Like</button> <br/>
        Creator: {blog.user.name} <br/>
        {displayDeleteButton()}
      </div>
    </div>
  )
}

Blog.propTypes = {

  blog: PropTypes.object.isRequired

}

export default Blog