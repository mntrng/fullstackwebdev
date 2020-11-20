import { useQuery, useApolloClient } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'
import { ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()
  const allBookResults = useQuery(ALL_BOOKS)

  useEffect(() => {
    setToken(localStorage.getItem('loggedinuser'))
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token && <button onClick={() => setPage('add')}>Add Book</button>}
        {!token && <button onClick={() => setPage('login')}>Login</button>}
        {token && <button onClick={() => setPage('recommend')}>Recommend</button>}
        {token && <button onClick={logout}>Log Out</button>}
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'} allBookResults={allBookResults}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'} setPage={setPage}
        setToken={setToken} client={client}
      />

      <Recommendation
        show={page === 'recommend'} allBookResults={allBookResults}
      />
    </div>
  )
}

export default App