import React, { useState } from 'react'
import {Button, TextField} from '@material-ui/core'

export default function EditForm({ handleEdit, handleChangeEditedTask, taskEdited, handleCancelEdit }) {
  
  const [task] = useState(taskEdited)

  return (
    <>
      <div className="edit">
        <div className="edit-title">
          <h4 className="edit-label">
            Editing task "{task}"
          </h4>
        </div>
        <form className="edit-form" onSubmit={handleEdit}>
          <TextField
            id="standard-basic"
            label={task}
            type='text'
            onChange={handleChangeEditedTask}
            value={taskEdited}
            className="edit-item"/>
          <Button
            variant="contained"
            color="primary"
            type='submit'
            className="edit-item">
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            type="button"
            className="edit-item"
            onClick={handleCancelEdit}>
            Cancel
          </Button>
        </form>
      </div>
    </>
  )
}