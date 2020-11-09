import React from 'react'
import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(a => a.id === id)

    return (
        <div>
            <h3>{anecdote.content} by {anecdote.author}</h3>
            has {anecdote.votes} votes<br/>
            for more info see <a href={anecdote.info}>{anecdote.info}</a>
        </div>
    )
}

export default Anecdote