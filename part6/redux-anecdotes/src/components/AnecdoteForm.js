import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        dispatch(createAnecdote(content))
        dispatch(setNotification(`"${content}" added!`, 5))
    }

    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
            <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm