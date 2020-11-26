import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'
import BookTable from './BookTable'

const Recommendation = ({show, currentUser, allBookResults}) => {

    if (!show || currentUser.loading || allBookResults.loading) {
        return null
    } else {
        var favBooks = allBookResults.data.allBooks.filter(book => book.genres.includes(currentUser.data.me.favoriteGenre))
    }

    return (
        <div>
            <h2>Books</h2>
            <p>Books that you might like according to your genre preference: <b>{currentUser.data.me.favoriteGenre}</b></p>
            <BookTable selectedBooks = {favBooks} />
        </div>
    )
}

export default Recommendation