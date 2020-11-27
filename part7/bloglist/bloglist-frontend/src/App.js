import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogPage from './components/BlogPage'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { Switch, Route, Link, useRouteMatch } from "react-router-dom"
import { AppBar, Button, Container, Grid, Toolbar, Typography } from "@material-ui/core";
import User from './components/User'
import { initUsers } from './reducers/usersReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
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
  const match = useRouteMatch('/users/:id')
  const user_ = match ? users.find(user => user.id === match.params.id)
                      : null

  return (
    <Container>
      <div>
        <Notification />
        
        {!user ? <LoginForm handleLogin = {handleLogin}/>
               : 
                 <div>
                    <AppBar position="sticky" style={{ background: '#8bc34a' }}>
                      <Toolbar>
                        <Grid container justify="space-between">
                          <Grid item>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/users">Users</Button>
                          </Grid>
                          <Grid item>
                            <Typography display="inline" style={{ marginRight: 16 }}><b>{user.name}</b> logged in.</Typography>
                            <Button color="secondary" variant="contained" component={Link} onClick={handleLogOut}>Log out</Button>
                          </Grid>
                        </Grid>
                      </Toolbar>
                    </AppBar>
                    
                    <Switch>
                      <Route path="/users">
                        <Users users={users} />
                      </Route>
                      <Route path="/users/:id">
                        <User user={user_}/>
                      </Route>
                      <Route path='/'>
                        <BlogPage blogs={blogs} handleLike={handleLike} handleBlogDelete={handleBlogDelete} user={user} handleBlogAddition={handleBlogAddition}/>
                      </Route>
                    </Switch>
                 </div>
        }
      </div>
    </Container>
  )
}

export default App