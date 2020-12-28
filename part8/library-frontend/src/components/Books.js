import React, { useState, useEffect } from 'react'
import { Button, Container } from 'semantic-ui-react'
import BookTable from './BookTable'

const Books = ({show, allBookResults}) => {
  const [genres, setGenres] = useState([])
  const [genreOption, setGenreOption] = useState('')
  const [books, setBooks] = useState([])
  const [selectedBooks, setSelectedBooks] = useState([])

  useEffect(() => {
    if (allBookResults.data) {
      const bookData = allBookResults.data.allBooks
      bookData.forEach(book => {
        book.genres.forEach(genre => {
          if (!genres.includes(genre)) {
            genres.push(genre)
          }
        })
      })

      if (!genres.includes('all genres')) {
        genres.push('all genres')
      }

      setGenres(genres)
      setBooks(bookData)
      setGenreOption('all genres')
    }
  }, [allBookResults, genres])

  useEffect(() => {
    if (genreOption === 'all genres') {
      setSelectedBooks(books)
    } else {
      setSelectedBooks(books.filter(book => book.genres.includes(genreOption)))
    }
  }, [books, genreOption])

  if (!show) {
    return null
  }

  try {
    return (
      <Container style={{ marginTop: 25 }}>
        <h2>Books</h2>
        <BookTable
          selectedBooks = {selectedBooks}
        />

        {genres.map(genre =>
          <Button compact key={genre} onClick={() => setGenreOption(genre)}>
            {genre}
          </Button>
        )}
      </Container>
    )
  } catch (error) {
    return null
  }
}

export default Books