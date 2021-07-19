import React from 'react'
import {Button, TextField} from '@material-ui/core'
import TaskItem from './TaskItem'

export default function TaskList({
    tasks,
    addNewTask,
    newTask,
    handleDoneChange,
    handleNewTaskChange,
    handleChangeShowEdit,
    handleRemoveTask }) {
    
    return (
      <>
        <div className="task-list-title-div">
          <h4 className="task-list-title">
            To-Do List
          </h4>
        </div>
        <ul className="task-list">
            {
            tasks.map(task => <TaskItem
              key={task.idTask}
              task={task}
              handleDoneChange={handleDoneChange}
              handleChangeShowEdit={handleChangeShowEdit}
              handleRemoveTask={handleRemoveTask}/>)
            }
        </ul>
        <div className="create-task-form">
          <div><h4 className="task-label">Create task</h4></div>
          <form onSubmit={addNewTask} className="task-form">
            <TextField
              id="standard-basic"
              label="New task"
              type="text"
              value={newTask}
              onChange={handleNewTaskChange}
              placeholder="New task"
              className="task-form-input"
            />
            <Button type='submit' variant="contained" color="primary" className="btn-add-folder">Add</Button>  
          </form>
        </div>
      </>
    )
  }