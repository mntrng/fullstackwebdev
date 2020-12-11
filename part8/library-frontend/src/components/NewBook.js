import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ADD_BOOK, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  var   [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],

    update: (store, response) => {
      props.updateCacheWith(response.data.addBook)
    },

    onCompleted: () => {
      props.setPage('books')
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    published = parseInt(published)
    await addBook({ 
      variables: { title, author, published, genres } 
    })
    
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div style={{marginTop: 25}}>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">Add Genre</button>
        </div>
        <div>
          Genres: {genres.join(' ')}
        </div>
        <button type='submit'>Create Book</button>
      </form>
    </div>
  )
}

export default NewBook