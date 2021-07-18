const tasksRouter = require('express').Router()
const mysqlConnection = require('../database')

//get all tasks
tasksRouter.get('/', (request, response) => {
    mysqlConnection.query('select * from tasks', (error, results) => {
        if (error) console.log(error)
        
        return response.status(200).json(results)
    })
})

//get one task
tasksRouter.get('/:id', (request, response) => {
    const { id } = request.params
    mysqlConnection.query(`select * from tasks where idTask=${id}`, (error, results) => {
        if (error) console.log(error)
        
        return response.status(200).json(results)
    })
})

//create task
tasksRouter.post('/', (request, response) => {
    const { idFolder, taskName } = request.body

    mysqlConnection.query(`insert into tasks (idFolder, taskName) values (${idFolder}, '${taskName}')`, (error, results) => {
        if (error) console.log(error)
        
        console.log('Successfully added', results.insertId)
        mysqlConnection.query(`select * from tasks where idTask=${results.insertId}`, (error, result) => {
            if (error) throw error
            
            return response.status(201).json(result[0])
        })
    })
})

//update one task
tasksRouter.put('/:id', (request, response) => {
    const { id } = request.params
    const { content } = request.body
    
    if (content) {
        mysqlConnection.query(`update tasks set taskName='${content}' where idTask=${id}`, (error) => {
            if (error) return console.log(error)
            
            mysqlConnection.query(`select * from tasks where idTask=${id}`, (error, result) => {
                if (error) throw error
                
                return response.status(200).json(result[0])
            })
        })
    } else {
        mysqlConnection.query(`select done from tasks where idTask=${id}`, (error, results) => {
            if (error) return console.log(error)
                
            const oldDone = results[0].done
            const newDone = (oldDone === 0) ? 1 : 0
        
            mysqlConnection.query(`update tasks set done=${newDone} where idTask=${id}`, (error, results) => {
                if (error) return console.log(error)
                    
                console.log(results)
                mysqlConnection.query(`select * from tasks where idTask=${id}`, (error, result) => {
                    if (error) throw error
                    
                    return response.status(200).json(result[0])
                })
            })
        })
    }
})

//delete one task
tasksRouter.delete('/:id', (request, response) => {
    const { id } = request.params
    
    mysqlConnection.query(`delete from tasks where idTask=${id}`, (error, results) => {
        if (error) return console.log(error)
        
        return response.status(200).end()
    })
})

module.exports = tasksRouter