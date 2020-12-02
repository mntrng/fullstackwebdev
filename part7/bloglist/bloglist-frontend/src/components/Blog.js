import { Button, Card, TextField } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addComment, deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ( { blog, user, handleNotice } ) => {

  const history = useHistory()
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const removeBlog = async () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      try {
        await dispatch(deleteBlog(blog.id))
        handleNotice('Deleted successfully.', true)
        history.push('/blogs')
      } catch (e) {
        console.log(e)
        handleNotice('Cannot delete!', false)
      }
    }
  }

  const createComment = event => {
    event.preventDefault()
    dispatch(addComment({...blog, comments: [...blog.comments, event.target.comment.value]}))
    handleNotice('Your comment has been added!', true)
    event.target.reset()
  }

  const handleLike = async () => {
    try {
      await dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }))
    } catch (e) {
      handleNotice('No like added!', false)
    }
  }

  return (
    <div>
      <Card style={{ padding: 20 }}>
        <h2>{blog.title} by {blog.author}</h2>
        URL: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a><br/>
        Likes: {blog.likes} <br/>
        Added by {blog.user.name} <br/>
        <h4>Comments</h4>

        <form onSubmit={ (event) => createComment(event) }>
          <TextField required name="comment" variant="filled" size="small" 
                     type="text" label="Comment"/>
          <Button variant="contained" type="submit" color="primary">Add</Button>
        </form>

        <ul>
          {blog.comments && blog.comments.map(cmt => (
            <li key={cmt}>{cmt}</li>
          ))}
        </ul>

        <div style={{ marginTop: 15 }}>
          <Button variant="contained" size="small" color="primary" onClick={handleLike}>Like</Button>
          {user.username === blog.user.username && <Button variant="contained" size="small" color="secondary" onClick={removeBlog}>Delete</Button>}
        </div>
      </Card>
    </div>
  )
}

export default Blog