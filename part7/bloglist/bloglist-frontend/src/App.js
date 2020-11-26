import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { Switch, Route } from "react-router-dom"
import Users from './components/Users'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      // Must convert to DOMstrings before saving to the storage
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      await dispatch(setUser(user))
      blogService.setToken(user.token)
      handleNotice('Logged in successfully', true)
    } catch (e) {
      handleNotice('Wrong username and/or password!', false)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    try {
      window.localStorage.clear()
      dispatch(setUser(null))
      handleNotice('Logged out successfully', true)
    } catch (e) {
      console.log(e)
    }
  }

  const handleBlogAddition = async (blogObject) => {
    try {
      // Control the togglevisibility of the Togglable component
      blogFormRef.current.toggleVisibility()
      await dispatch(createBlog(blogObject))
      handleNotice(`A new blog titled "${blogObject.title}" by ${blogObject.author} created successfully`, true)
    } catch (e) {
      handleNotice('No new blog created!', false)
    }
  }

  const handleNotice = (message, status) => {
    dispatch(setNotification([message, status]))
  }

  const handleLike = async newBlogObject => {
    try {
      await blogService.update(newBlogObject)
      dispatch(initBlogs(blogs.map(blog => blog.id === newBlogObject.id ? newBlogObject : blog)))
    } catch (e) {
      handleNotice('No like added!', false)
    }
  }

  const handleBlogDelete = async blogId => {
    try {
      await blogService.remove(blogId)
      dispatch(initBlogs(blogs.filter(blog => blog.id !== blogId)))
      handleNotice('Deleted', true)
    } catch (e) {
      handleNotice('Cannot delete!', false)
    }
  }

  const blogFormRef = useRef()

  return (
    <div>

      <Notification />

      {user === null
        ?
        <div>
          <h2>Blog Portal</h2>
          <Togglable buttonLabel = "Magic Gate">
            <LoginForm handleLogin = {handleLogin}/>
          </Togglable>
        </div>
        :
        <div>
          {/* <Switch>
            <Route path="/users"> <Users /> </Route>
            <Route path="/"> <Users /> </Route>
          </Switch> */}
          <p>{user.name} logged-in <button onClick={handleLogOut} type="submit">Log out</button></p>

          <Togglable buttonLabel = "Create a new blog" ref={blogFormRef}>
            <BlogForm handleBlogAddition = {handleBlogAddition} />
          </Togglable>

          <h2>Blogs</h2>
          {blogs.sort((a, b) => b.likes - a.likes)
            .map(blog => <Blog key={blog.id} blog={blog} user={user}
              handleLike={handleLike} handleDeleteBlog={handleBlogDelete}/>
            )}

          <div><Users /></div>
        </div>
      }
    </div>
  )
}

export default App