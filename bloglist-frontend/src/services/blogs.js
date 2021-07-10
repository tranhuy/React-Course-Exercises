import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (err) {
    throw new Error(err.response.data.error)
  }
  
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll, create, setToken }