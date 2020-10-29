import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [blogVisible, setBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs(initialBlogs)
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      // Must convert to DOMstrings before saving to the storage
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')

      handleNotice('Logged in successfully', true)
    } catch (e) {
      console.log(e)
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
      handleNotice(`A new blog titled "${blogObject.title}" by ${blogObject.author} created successfully`, true)
    } catch (e) {
      handleNotice("No new blog created!", false)    
    }
  }

  const handleNotice = (message, status) => {
    setNotification( [message, status] )
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const loginForm = () => {

    return (
      <div><h4>Log in to application</h4>
      <form onSubmit={handleLogin}>
      <div>
        Username
          <input
          type="text" value={username} name="Username"
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        Password
          <input
          type="password" value={password} name="Password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">Login</button>
      </form></div>
  )}

  return (
    <div>

      <Notification message = {notification} />

      {user === null ?
        loginForm()  : 
        <div>
          <p>{user.name} logged-in <button onClick={handleLogOut} type="submit">Log out</button></p> 

          <BlogForm handleBlogAddition = {handleBlogAddition} />

          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
      }
    </div>
  )
}

export default App