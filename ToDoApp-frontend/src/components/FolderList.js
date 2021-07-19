import React from 'react'
import FolderItem from './FolderItem'


export default function FolderList({
    allFolders,
    handleShowFolderTasks,
    handleRemoveFolder }){    
    return (
        <>
            <ul className="folder-list">
                {
                    allFolders.map(folder => <FolderItem
                        key={folder.idFolder}
                        folder={folder}
                        handleShowFolderTasks={handleShowFolderTasks}
                        handleRemoveFolder={handleRemoveFolder}/>)
                }
            </ul>
        </>
    )
  }