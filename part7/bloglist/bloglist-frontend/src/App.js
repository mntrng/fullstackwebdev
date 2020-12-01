import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogPage from './components/BlogPage'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { Switch, Route, Link, useRouteMatch } from "react-router-dom"
import { AppBar, Button, Container, Grid, Toolbar, Typography } from "@material-ui/core";
import User from './components/User'
import { initUsers } from './reducers/usersReducer'
import Home from './components/Home'

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
    // eslint-disable-next-line
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

  const blogFormRef = useRef()
  const match = useRouteMatch('/users/:id')
  const user_ = match ? users.find(user => user.id === match.params.id)
                      : null
  const matchBlog = useRouteMatch('/blogs/:id')
  const blog_ = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id)
                          : null

  return (
    <Container>
      <div>
        <Notification />
        
        {!user ? <LoginForm handleLogin = {handleLogin}/>
               : 
                 <div>
                    <AppBar position="sticky" style={{ background: '#8bc34a', marginBottom: 25 }}>
                      <Toolbar>
                        <Grid container justify="space-between">
                          <Grid item>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/blogs">Blogs</Button>
                            <Button color="inherit" component={Link} to="/users">Users</Button>
                          </Grid>
                          <Grid item>
                            <Typography display="inline" style={{ marginRight: 16 }}><b>{user.name}</b> logged in.</Typography>
                            <Button color="secondary" variant="contained" onClick={handleLogOut}>Log out</Button>
                          </Grid>
                        </Grid>
                      </Toolbar>
                    </AppBar>
                    
                    <Switch>
                      <Route exact path="/users">
                        <Users users={users} />
                      </Route>
                      <Route path="/users/:id">
                        <User user={user_}/>
                      </Route>
                      <Route exact path='/blogs'>
                        <BlogPage blogs={blogs} blogFormRef={blogFormRef} handleBlogAddition={handleBlogAddition}/>
                      </Route>
                      <Route path="/blogs/:id">
                        <Blog user={user} blog={blog_} handleNotice={handleNotice}/>
                      </Route>       
                      <Route path="/">
                        <Home />
                      </Route>                 
                    </Switch>
                 </div>
        }
      </div>
    </Container>
  )
}

export default App