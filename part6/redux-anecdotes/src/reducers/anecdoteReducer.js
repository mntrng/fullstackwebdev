import anecdoteService from "../services/anecdoteService"

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'INIT_ANECS':
      return action.data

    case 'VOTE':
      const id = action.data.id
      
      return state.map(anecdote => anecdote.id !== id 
                                   ? anecdote 
                                   : {...anecdote, votes: anecdote.votes + 1})
                  .sort((a,b) => b.votes - a.votes)
    
    case 'NEW_ANEC':
      return [...state, action.data]

    default:
      return state
  }
}

export const vote = anecdote => {
  return async dispatch => {
    const updatedVote = await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedVote
  })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
      const newAnecdote = await anecdoteService.postAnecdote(content)
      dispatch({
        type: 'NEW_ANEC',
        data: newAnecdote
  })
  }
}

// redux-thunk: return a function having the dispatch-method as its parameter
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECS',
      data: anecdotes
    })
  }
}

export default anecdoteReducer