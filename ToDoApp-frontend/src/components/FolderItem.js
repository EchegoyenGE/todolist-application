import { Button } from '@material-ui/core'
import React from 'react'

export default function FolderItem ({folder, handleShowFolderTasks, handleRemoveFolder}){
    return (
        <li className="folder-item">
          <div className="list-row-item">
          {folder.name}
          </div>
          <div className="list-row-item">
            <Button variant="outlined" color="primary"className="item-view" onClick={() => handleShowFolderTasks(folder)}>View Items</Button>
          </div>
          <div className="list-row-item">
            <Button variant="outlined" color="secondary" className="item-remove" onClick={() => handleRemoveFolder(folder)}>Remove</Button>
          </div>  
        </li>
      )
}