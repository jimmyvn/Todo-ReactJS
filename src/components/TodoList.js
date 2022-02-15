import React from "react"
import { db } from '../configs/firebase'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

const TodoList = () => {
  const [tasksList, setTasksList] = React.useState([])
  const tasksRef = collection(db, "tasks")

  React.useEffect(() => {
    console.log('Effect Hook has ran')

    const getTasks = async () => {
      const data = await getDocs(tasksRef)
      setTasksList(data.docs.map((task) => ({
        ...task.data(),
        id: task.id
      })))
    }

    getTasks()
  }, [])

  console.log(tasksList)

  const handleChangeTaskTitle = (event) => {
    const {value, id} = event.target

    setTasksList(prevTasks => {
      return prevTasks.map(prevTask => {
        return prevTask.id === id ? {...prevTask, title: value} : prevTask
      })
    })
  }

  const handleBlurTaskTitle = async (id, title) => {
    const taskDoc = doc(db, 'tasks', id)
    console.log('The task is saving')

    await updateDoc(taskDoc, {
      title: title,
      updatedAt: new Date().toISOString()
    }).then(() => {
      console.log('The task has been saved')
    })
  }

  const handleTaskStatus = async (id) => {
    console.log('The task status is saving')
    setTasksList(prevTasks => {
      return prevTasks.map(prevTask => {
        return prevTask.id == id ? {...prevTask, status: !prevTask.status} : prevTask
      })
    })

    const taskDocRef = doc(db, 'tasks', id)
    const taskDoc = await getDoc(taskDocRef)
    
    await updateDoc(taskDocRef, {
      status: !taskDoc.status,
      updatedAt: new Date().toISOString()
    }).then(() => {
      console.log('The task status has been saved')
    })
  }
  
  const [formData, setFormData] = React.useState({
    title: '',
    status: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })

  const handleChangeStatus = (event) => {
    const {name} = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: !prevFormData.status,
      updatedAt: new Date().toISOString()
    }))
  }

  const handleSubmitAddTaskForm = async (event) => {
    event.preventDefault()

    if (formData.title.length === 0) {
      console.log('The title must be not empty')
      return
    }

    await addDoc(tasksRef, {
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }).then((doc) => {
      setTasksList(prevTasks => {
        return [...prevTasks, {
          id: doc.id,
          title: formData.title,
          status: formData.status,
          createdAt: formData.createdAt,
          updatedAt: formData.updatedAt,
        }]
      })
    })

    setFormData({
      title: '',
      status: false
    })
  }

  const handleChangeTitle = (event) => {
    const {name, value} = event.target

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleRemoveTask = async (id) => {
    const taskDocument = doc(db, 'tasks', id)
    await deleteDoc(taskDocument)

    setTasksList(prevTasks => {
      return prevTasks.filter(task => task.id !== id)
    })
  }

  const tasksListELements = tasksList.map((task) => {
    return (
      <div className="task-item" key={task.id}>
        <div className="remove-task">
          <a
            href="#"
            onClick={() => handleRemoveTask(task.id)}
          >
            x
          </a>
        </div>
        <div className="task-title form-input">
          <input
            type="text"
            value={task.title}
            className="task-input default-input"
            id={task.id}
            onChange={handleChangeTaskTitle}
            onBlur={() => handleBlurTaskTitle(task.id, task.title)}
          />
        </div>
        <div className="task-status">
          <input
            type="checkbox"
            checked={task.status}
            id={`custom-checkbox-${task.id}`}
            onChange={() => handleTaskStatus(task.id)}
          />
        </div>
      </div>
    )
  })
  
  return (
    <div className="todo-list-parent">

      {tasksList.length > 0 ? tasksListELements : <p>You're all caught up</p> }
      
      <div className="add-task">
        <form onSubmit={handleSubmitAddTaskForm}>
          <div className="form-input">
            <label htmlFor="title" className="required">Task Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChangeTitle}
              className="default-input"
            />
          </div>
          <div className="form-input">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              id="status"
              onChange={handleChangeStatus}
            />
            <label htmlFor="status">
              Task Status
            </label>
          </div>
          <button
            className="btn btn-secondary"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  )
}

export default TodoList