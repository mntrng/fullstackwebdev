import React, {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client'
import BookTable from './BookTable'
import { CURRENT_USER } from '../queries'

const Recommendation = ({show, allBookResults}) => {
    const [favBooks, setFavBooks] = useState([])
    const currentUser = useQuery(CURRENT_USER)

    useEffect(() => {

        if (currentUser.data) {
            var favBooks = []
            allBookResults.data.allBooks.forEach(book => {
                if (book.genres.includes(currentUser.data.me.favoriteGenre)) {
                  favBooks.push(book)
                }
            })

            setFavBooks(favBooks)
        }

    }, [allBookResults])

    if (!show || currentUser.loading || allBookResults.loading) {
        return null
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