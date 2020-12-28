import { useLazyQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { Container, Segment } from 'semantic-ui-react'
import { ALL_BOOKS } from '../queries'
import BookTable from './BookTable'

const Recommendation = ({ show, currentUser }) => {

    const favGenre = currentUser.data?.me?.favoriteGenre
    const [getBooks, results] = useLazyQuery(ALL_BOOKS, {
        fetchPolicy: "network-only"
    })
    const [favoriteBooks, setFavoriteBooks] = useState([])

    useEffect(() => {
        if (results.data) {
            setFavoriteBooks(results.data.allBooks)
        }
    }, [setFavoriteBooks, results])

    useEffect(() => {
        if (currentUser.data) {
          getBooks({ variables: { genre: favGenre } })
        }
    }, [getBooks, currentUser, favGenre])

    if (!show) {
        return null
    }

    return (
        <Container style={{ marginTop: 25 }}>
            <h2>Recommended Books</h2>
            <Segment>Books that you might like according to your genre preference: <b>{favGenre}</b></Segment>
            <BookTable selectedBooks = {favoriteBooks} />
        </Container>
    )
}

export default Recommendation