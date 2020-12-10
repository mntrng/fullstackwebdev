import { useLazyQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
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
        <div>
            <h2>Books</h2>
            <p>Books that you might like according to your genre preference: <b>{favGenre}</b></p>
            <BookTable selectedBooks = {favoriteBooks} />
        </div>
    )
}

export default Recommendation