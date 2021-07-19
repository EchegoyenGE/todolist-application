import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

const getAll = () => {
    const request = axios.get(`${BASE_URL}/api/folders`)
    return request.then(response => response.data)
}

const removeFolder = (idFolder) => {
    const request = axios.delete(`${BASE_URL}/api/folders/${idFolder}`)
    return request.then(response => response.data)
}

const create = (nFolder) => {
    const request = axios.post(`${BASE_URL}/api/folders`, nFolder)
    return request.then(response => response.data)
}

export default {
    getAll,
    removeFolder,
    create
}
