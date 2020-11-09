import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { resetNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const searchText = useSelector(state => state.filter)
    
    const anecdotes = useSelector(state => {
        const anecdotes = state.anecdotes
        const filter = state.filter
        if (filter === '') {
            return anecdotes
        } else {
            return anecdotes.filter(a => a.content.toLowerCase().includes(searchText.toLowerCase()))
        }
    })

    const addVote = anecdote => {
        dispatch(vote(anecdote.id))
        dispatch(setNotification(`You voted for "${anecdote.content}"`))
        setTimeout(() => dispatch(resetNotification()), 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes} &nbsp;
                    <button onClick={() => addVote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList