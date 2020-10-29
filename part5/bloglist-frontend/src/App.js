import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll()
      .then(sortedBlogs => setBlogs(sortedBlogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      // Must convert to DOMstrings before saving to the storage
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUser(user)
      handleNotice('Logged in successfully', true)
    } catch (e) {
      handleNotice('Wrong username and/or password!', false)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    try {
      window.localStorage.clear()
      setUser(null)
      handleNotice('Logged out successfully', true)
    } catch (e) {
      console.log(e)
    }
  }

  const handleBlogAddition = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))

      // Control the togglevisibility of the Togglable component
      blogFormRef.current.toggleVisibility()

      handleNotice(`A new blog titled "${blogObject.title}" by ${blogObject.author} created successfully`, true)
    } catch (e) {
      handleNotice('No new blog created!', false)
    }
  }

  const handleNotice = (message, status) => {
    setNotification( [message, status] )
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLike = async newBlogObject => {
    try {
      await blogService.update(newBlogObject)
      setBlogs(blogs.map(blog => blog.id === newBlogObject.id ? newBlogObject : blog))
    } catch (e) {
      handleNotice('No liked added!', false)
    }
  }

  const handleBlogDelete = async blogId => {
    try {
      await blogService.remove(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
      handleNotice('Deleted', true)
    } catch (e) {
      handleNotice('Cannot delete!', false)
    }
  }

  const blogFormRef = useRef()

  return (
    <div>

      <Notification message = {notification} />

      {user === null
        ?
        <div>
          <h2>Blog Portal</h2>
          <Togglable buttonLabel = "Magic Gate">
            <LoginForm handleLogin = {handleLogin} />
          </Togglable>
        </div>
        :
        <div>
          <p>{user.name} logged-in <button onClick={handleLogOut} type="submit">Log out</button></p>

          <Togglable buttonLabel = "Create a new blog" ref={blogFormRef}>
            <BlogForm handleBlogAddition = {handleBlogAddition} />
          </Togglable>

          <h2>Blogs</h2>
          {blogs.sort((a, b) => b.likes - a.likes)
            .map(blog => <Blog key={blog.id} blog={blog} user={user}
              handleLike={handleLike} handleDeleteBlog={handleBlogDelete}/>
            )}
        </div>
      }
    </div>
  )
}

export default App