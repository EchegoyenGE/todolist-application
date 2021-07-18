const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const cors = require('cors')

const tasksRouter = require('./controllers/tasks')
const foldersRouter = require('./controllers/folders')

app.use(cors())
app.use(express.json())
 
app.use(express.static('build'))

app.use('/api/tasks', tasksRouter)
app.use('/api/folders', foldersRouter)

app.use((request, response) => {
    response.status(404).json({
        error: 'Not found'
    })
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})