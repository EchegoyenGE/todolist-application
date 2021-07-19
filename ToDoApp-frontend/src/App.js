import React, { useEffect, useState } from 'react'

import TaskList from './components/TaskList'
import FolderList from './components/FolderList'
import EditForm from './components/EditForm'
import CreateFolderForm from './components/CreateFolderForm'
import Notification from './components/Notification'

import tasksService from './services/tasks'
import foldersService from './services/folders'

function App() {

  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  
  const [allFolders, setAllFolders] = useState([])
  const [currentFolder, setCurrentFolder] = useState(null)
  const [newFolder, setNewFolder] = useState('')

  const [currentTask, setCurrentTask] = useState(null)
  const [taskEdited, setTaskEdited] = useState('')
  const [showEdit, setShowEdit] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    tasksService
      .getAllTasks()
      .then(initialTasks => {
        setTasks(initialTasks)
      })

    foldersService
      .getAll()
      .then(initialFolders => {
        setAllFolders(initialFolders)
      })
  }, [])

  const handleDoneChange = (task) => {
    tasksService
      .toggleDone(task.idTask)
      .then(response => {
        setTasks(tasks.map(data => {
          if (task.idTask === data.idTask) {
            task.done = !task.done
          }
          return data
        }))
      })
  }

  const handleNewTaskChange = ({ target }) => {
    setNewTask(target.value)
    console.log(target.value)
  }

  const callError = (message) => {
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage('')
      }, 1500)
  } 

  const addNewTask = (e) => {
    e.preventDefault()

    if (newTask === '') {
      callError('The task is empty')
      return
    }
    
    const names = tasksToShow.map(t => t.taskName.toLowerCase())

    let validation = true
    if (names.indexOf(newTask.toLowerCase()) >= 0) {
      validation = window.confirm('This task already exists, continue?')
    }
    
    if (!validation) {
      return
    }

    const taskToAdd = {
      taskName: newTask,
      idFolder: currentFolder.idFolder
    }

    tasksService
      .addNew(taskToAdd)
      .then(data => {
        setTasks([...tasks, data])
    })    
    setNewTask('')
  }

  const handleShowFolderTasks = ({ name, idFolder }) => {
    const curFolder = {name, idFolder}
    setCurrentFolder(curFolder)
  }

  const handleRemoveTask = (task) => {

    let validation = window.confirm('Are you sure you want to delete this task?')

    if (!validation) {
      return
    }

    tasksService
      .removeTask(task.idTask)
      .then((deletedTask) => {
        setTasks(tasks.filter(t => t.idTask !== task.idTask))
      })
  }

  const handleDisplayAllFolders = () => {
    setCurrentTask(null)
    setTaskEdited('')
    setShowEdit(false)
    setCurrentFolder(null)
  }

  const handleRemoveFolder = (folder) => {

    let validation = window.confirm('Are you sure you want to delete this folder?')

    if (!validation) {
      return
    }

    foldersService
      .removeFolder(folder.idFolder)
      .then((deletedFolder) => {
        setAllFolders(allFolders.filter(f => f.idFolder !== folder.idFolder))
      })
  }

  const handleChangeShowEdit = (task) => {
    setCurrentTask(task)
    setTaskEdited(task.taskName)
    setShowEdit(!showEdit)
  }

  const handleChangeEditedTask = ({target}) => {
    setTaskEdited(target.value)
  }

  const handleCancelEdit = () => {
    setTaskEdited('')
    setShowEdit(false)
  }

  const handleEdit = (e) => {
    e.preventDefault()

    if (taskEdited === '') {
      callError('The edited task is empty')
      return
    }

    const names = tasksToShow.map(t => t.taskName.toLowerCase())

    let validation = true
    if (names.indexOf(taskEdited.toLowerCase()) >= 0) {
      validation = window.confirm('This task already exists, continue?')
    }
    
    if (!validation) {
      return
    }

    const updatedTask = {
      content: taskEdited
    }

    tasksService
      .updateTaskName(currentTask.idTask, updatedTask)
      .then((taskUpdated) => {
        setTasks(tasks.map(task => {
          if (task.idTask === taskUpdated.idTask) {
            return taskUpdated
          }
          return task
        }))
      })

    setTaskEdited('')
    setShowEdit(false)
    setCurrentTask(null)
  }

  const handleChangeNewFolder = ({target}) => {
    setNewFolder(target.value)
    console.log(target.value)
  }

  const handleCreateFolder = (e) => {
    e.preventDefault()

    if (newFolder === '') {
      callError('New folder\'s name is empty')
      return
    }

    const nFolder = {
      name: newFolder
    }

    foldersService
      .create(nFolder)
      .then((data) => {
        setAllFolders([...allFolders, data])
      })
    setNewFolder('')
  }

  const tasksToShow = (currentFolder)
    ? tasks.filter(task => task.idFolder === currentFolder.idFolder)
    : []
  
  return (
    <>
      <div className="App">
        <div className="App-title">
          <h1 onClick={handleDisplayAllFolders}>To Do App</h1>
        </div>
        <div className="error-notification">
          <Notification message={errorMessage} />
        </div>
        <div className="directory">
          <span onClick={handleDisplayAllFolders}>Folders</span>
          <span>
            {
              (currentFolder)
                ? `> ${ currentFolder.name }`
                : ''
            }
          </span>
        </div>
        <div className="work-zone">
          {
            (currentFolder === null)
              ? <div>
                  <FolderList
                    allFolders={allFolders}
                    handleShowFolderTasks={handleShowFolderTasks}
                    handleRemoveFolder={handleRemoveFolder}
                  />
                  <CreateFolderForm
                    newFolder={newFolder}
                    handleCreateFolder={handleCreateFolder}
                    handleChangeNewFolder={handleChangeNewFolder}
                  />
                </div>
              : (showEdit)
                ? <EditForm
                    handleEdit={handleEdit}
                    handleChangeEditedTask={handleChangeEditedTask}
                    taskEdited={taskEdited}
                    handleCancelEdit={handleCancelEdit}
                  />
                : <TaskList
                    tasks={tasksToShow}
                    addNewTask={addNewTask}
                    newTask={newTask}
                    handleDoneChange={handleDoneChange}
                    handleNewTaskChange={handleNewTaskChange}
                    handleChangeShowEdit={handleChangeShowEdit}
                    handleRemoveTask={handleRemoveTask}
                  />
          }
        </div>
      </div>
    </>
  )
}

export default App
