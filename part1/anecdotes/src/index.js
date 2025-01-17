import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [noVotes, increaseVote] = useState(new Array(anecdotes.length).fill(0))

  const selectAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const voteUp = () => {
    const noVotes1 = [...noVotes];
    noVotes1[selected]++;
    increaseVote(noVotes1);
  }

  const getMax = () => noVotes.indexOf(Math.max(...noVotes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}
      <br />
      has {noVotes[selected]} votes.
      </p>

      <Button
        handleClick={voteUp}
        text='vote' 
      />
      <Button
        handleClick={selectAnecdote}
        text='next anecdote' 
      />
      <br />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[getMax()]}
      <br />
      has {noVotes[getMax()]} votes.</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)