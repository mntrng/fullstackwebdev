import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import Togglable from './Togglable'

const LoginForm = ( { handleLogin } ) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()

    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Blog Portal</h2>
      <Togglable buttonLabel = "Magic Gate">
        <h4>Log in to this awesome Application</h4>
        <form onSubmit={login}>
          <div>
            <TextField label="Username" variant="filled" size="small" 
                      type="text" value={username} id="username" name="Username"
                      onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            <TextField label="Password" variant="filled" size="small" 
                      type="password" value={password} id="password" name="Password"
                      onChange={({ target }) => setPassword(target.value)} />
          </div>
          <Button type="submit" variant="contained" color="primary">Login</Button>
        </form>
      </Togglable>
    </div>
  )
}

export default LoginForm