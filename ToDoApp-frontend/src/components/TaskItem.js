import { Button } from '@material-ui/core'
import React from 'react'

export default function TaskItem ({task, handleDoneChange, handleChangeShowEdit, handleRemoveTask}) {
    return (
      <li className="list-item">
        <div className="cb-list-row-item">
          <input
            type="checkbox"
            className="task-checkbox"
            checked={task.done}
            onChange={() => handleDoneChange(task)}
          />
        </div>
        <div className="name-list-row-item">
          {task.taskName}
        </div>
        <div className="list-row-item">
          <Button variant="outlined" color="primary" className="task-edit" onClick={() => handleChangeShowEdit(task)}>Edit</Button>
        </div>
        <div className="list-row-item">
          <Button variant="outlined" color="secondary" className="task-remove" onClick={() => handleRemoveTask(task)} >Remove</Button>
        </div>
      </li>
    )
  }
  