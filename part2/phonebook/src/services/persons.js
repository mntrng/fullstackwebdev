import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = personObject => {
    return axios.post(baseUrl, personObject)
}

const deleteContact = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newData) => {
    return axios.put(`${baseUrl}/${id}`, newData)
}

export default { create, deleteContact, getAll, update }