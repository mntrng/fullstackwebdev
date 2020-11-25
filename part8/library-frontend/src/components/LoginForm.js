import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
        setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
        const token = result.data.login.value
        setToken(token)
        setPage('authors')
        localStorage.setItem('loggedinuser', token)
    }
  }, [result.data])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    await login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          Username &nbsp;
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          Password &nbsp;
          <input
            value={password}
            type='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm