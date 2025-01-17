import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
    <div><h4>Log in to application</h4>
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
      </form></div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm