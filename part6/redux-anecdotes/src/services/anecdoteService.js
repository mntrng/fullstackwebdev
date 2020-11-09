import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const postAnecdote = async (content) => {
    const anecdoteObj = {content, id: (100000 * Math.random()).toFixed(0), votes: 0}
    const response = await axios.post(baseUrl, anecdoteObj)
    return response.data  
}

const addVote = async (object) => {

    const updatedObj = {...object, votes: object.votes + 1}
    const response = await axios.put(`${baseUrl}/${object.id}`, updatedObj)
    return response.data
}

export default { getAll, postAnecdote, addVote }