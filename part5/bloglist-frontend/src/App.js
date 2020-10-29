import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [user, setUser] = useState(null)

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
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    try {
      window.localStorage.clear()
      setUser(null)    
    } catch (e) {
      console.log(e)
    }
  }

  const handleBlogAddition = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
        user: user
      }

      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setBlogAuthor('')
      setBlogTitle('')
      setBlogUrl('')
    } catch (e) {
    
    }
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

  const blogForm = () => {
    return (
      <div><h4>Create a new blog</h4>
      <form onSubmit={handleBlogAddition}>
      <div>
        Title
          <input
          type="text" value={blogTitle} name="Title"
          onChange={({ target }) => setBlogTitle(target.value)} />
      </div>
      <div>
        Author
          <input
          type="text" value={blogAuthor} name="Title"
          onChange={({ target }) => setBlogAuthor(target.value)} />
      </div>
      <div>
        URL
          <input
          type="text" value={blogUrl} name="Title"
          onChange={({ target }) => setBlogUrl(target.value)} />
      </div>
      <button type="submit">Create</button>
      </form></div>
  )}

  return (
    <div>

      {user === null ?
        loginForm()  : 
        <div>
          <p>{user.name} logged-in <button onClick={handleLogOut} type="submit">Log out</button></p> 

          {blogForm()}

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