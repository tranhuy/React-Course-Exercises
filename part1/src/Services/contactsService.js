import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = '/api/persons'

const getContacts = () => {
    const request = axios.get(baseUrl);
    return request.then(resp => resp.data);
}

const addContact = (newContact) => {
    const request = axios.post(baseUrl, newContact);
    return request.then(resp => resp.data);
}

const updateContact = (id, updatedContact) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedContact);
    return request.then(resp => resp.data);
}

const deleteContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

export default { getContacts, addContact, updateContact, deleteContact }