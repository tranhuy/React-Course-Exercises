import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    let newAnecdote = { content, votes: 0 }
    
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const update = async (id, modifiedObj) => {
    const response = await axios.put(`${baseUrl}/${id}`, modifiedObj)
    return response.data
}

export default { getAll, createNew, update }