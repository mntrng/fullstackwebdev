import React, { useState } from 'react'

const Blog = ({ blog, handleLike }) => {

  const [displayAll, setDisplayAll] = useState(false)

  const hideWhenVisible = { display: displayAll ? 'none' : ''}
  const showWhenVisible = { display: displayAll ? '' : 'none'}

  const toggleDisplayState = () => {
    setDisplayAll(!displayAll)
  }

  const addLike = event => {
    event.preventDefault()
    const newBlogObject = {...blog, likes: blog.likes + 1}

    handleLike(newBlogObject)
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
        {blog.title} by {blog.author} <button id= 'hideB' onClick={toggleDisplayState}>Hide</button> <br/>
        URL: {blog.url} <br/>
        Likes: {blog.likes} <button id='likeB' onClick={addLike}>Like</button> <br/>
        Creator: {blog.user.name}
        </div>
    </div>
  )
}

export default Blog