import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
    
    const addVote = anecdote => {
        props.vote(anecdote)
        props.setNotification(`You voted for "${anecdote.content}"`, 5)
    }

    return (
        <div>
            {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const mapStateToProps = (state) => {
    const anecdotes = state.anecdotes
    const filter = state.filter

    if (filter === '') {
        return { anecdotes: anecdotes }
    } else {
        return { anecdotes: anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())) }
    }
}

const mapDispatchToProps = {
    vote,
    setNotification
}

const ConnectedAnecdotes = connect( mapStateToProps, mapDispatchToProps )(AnecdoteList)
export default ConnectedAnecdotes