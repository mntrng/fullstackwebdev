import { useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setPage, client }) => {
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
        console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
        const token = result.data.login.value
        setToken(token)
        setPage('authors')
        localStorage.setItem('loggedinuser', token)
        client.resetStore()
    }
  }, [result.data])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    await login({ variables: { username: event.target.username.value, password: event.target.password.value } })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          Username &nbsp;
          <input
            type='text' name='username'
          />
        </div>

        <div>
          Password &nbsp;
          <input
            type='password' name='password'
          />
        </div>

        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm