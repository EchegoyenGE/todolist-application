import React from 'react'
import { Button, TextField } from '@material-ui/core'

export default function CreateFolderForm ({newFolder, handleCreateFolder, handleChangeNewFolder}) {
    return (
      <div className="create-folder-form">
          <br/>
          <div className="create-folder-form-label"><h4 className="folder-label">Create folder</h4></div>
          <form onSubmit={handleCreateFolder} className="folder-form">
          <TextField
            id="standard-basic"
            label="New folder"
            type='text'
            onChange={handleChangeNewFolder}
            value={newFolder}
            placeholder="New folder"
            className="folder-form-input"/>
            <Button type='submit' variant="contained" color="primary" className="btn-add-folder">Add</Button>
          </form>
      </div> 
    )
  }