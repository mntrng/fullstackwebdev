import React from 'react'
import BookTable from './BookTable'

const Recommendation = ({show, allBookResults, currentUser}) => {

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