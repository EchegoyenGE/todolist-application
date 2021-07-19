import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

const getAllTasks = () => {
    const request = axios.get(`${BASE_URL}/api/tasks`)
    return request.then(response => response.data)
}

const toggleDone = (idTask) => {
    const request = axios.put(`${BASE_URL}/api/tasks/${idTask}`)
    return request.then(response => response.data)
}

const addNew = (newTask) => {
    const request = axios.post(`${BASE_URL}/api/tasks`, newTask)
    return request.then(response => response.data)
}

const removeTask = (idTask) => {
    const request = axios.delete(`${BASE_URL}/api/tasks/${idTask}`)
    return request.then(response => response.data)
}

const updateTaskName = (idTask, updatedTask) => {
    const request = axios.put(`${BASE_URL}/api/tasks/${idTask}`, updatedTask)
    return request.then(response => response.data)
}

export default {
    getAllTasks,
    toggleDone,
    addNew,
    removeTask,
    updateTaskName
}
