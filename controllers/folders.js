const foldersRouter = require('express').Router()
const mysqlConnection = require('../database')

//get all folders
foldersRouter.get('/', (request, response) => {
    mysqlConnection.query('select * from folders', (error, results) => {
        if (error) throw error

        return response.json(results)
    })
})

//create folder
foldersRouter.post('/', (request, response) => {
    const { name } = request.body
    
    mysqlConnection.query(`insert into folders (name) values ('${name}')`, (error, results) => {
        if (error) return console.log(error)
        
        mysqlConnection.query(`select * from folders where idFolder=${results.insertId}`, (error, result) => {
            if (error) throw error
            
            return response.status(201).json(result[0])
        })
    })
})

//delete folder 
foldersRouter.delete('/:id', (request, response) => {
    const { id } = request.params

    mysqlConnection.query(`delete from folders where idFolder=${id}`, (error, results) => {
        if (error) return console.log(error)
        
        mysqlConnection.query(`delete from tasks where idFolder=${id}`, (error, results) => {
            if (error) return console.log(error)

            return response.status(200).end()
        })
    })
})

module.exports = foldersRouter