import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'
import { ALL_BOOKS, BOOK_ADDED, CURRENT_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()
  const allBookResults = useQuery(ALL_BOOKS)
  const currentUser = useQuery(CURRENT_USER)

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useEffect(() => {
    setToken(localStorage.getItem('loggedinuser'))
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      alert(`${addedBook.title} added!`)
      updateCacheWith(addedBook)
    }
  })

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
        show={page === 'add'} updateCacheWith={updateCacheWith} setPage={setPage}
      />

      <LoginForm
        show={page === 'login'} setPage={setPage}
        setToken={setToken} client={client}
      />

      <Recommendation
        show={page === 'recommend'} currentUser={currentUser} allBookResults={allBookResults}
      />
    </div>
  )
}

export default App