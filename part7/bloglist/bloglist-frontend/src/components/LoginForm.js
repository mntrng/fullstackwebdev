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
          Username
            <input
              type="text" value={username} id="username" name="Username"
              onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
          Password
            <input
              type="password" value={password} id="password" name="Password"
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit" id="loginB">Login</button>
        </form>
      </Togglable>
    </div>
  )
}

export default LoginForm