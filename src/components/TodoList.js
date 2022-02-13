import React from "react"
import { tasks } from './data/DataTest'

const TodoList = () => {

  const [tasksList, setTasksList] = React.useState(tasks)

  const handleChangeTaskTitle = (event) => {
    const {value, id} = event.target

    setTasksList(prevTasks => {
      return prevTasks.map(prevTask => {
        return prevTask.taskId === parseInt(id) ? {...prevTask, title: value} : prevTask
      })
    })
  }

  const handleFinishedTask = (taskId) => {
    setTasksList(prevTasks => {
      return prevTasks.map(prevTask => {
        return prevTask.taskId == taskId ? {...prevTask, isFinished: !prevTask.isFinished} : prevTask
      })
    })
  }
  
  const [formData, setFormData] = React.useState({
    title: ''
  })

  const handleSubmitAddTaskForm = (event) => {
    event.preventDefault()

    if (formData.title.length === 0) {
      return;
    }

    setTasksList(prevTasks => {
      return [...prevTasks, {
        taskId: prevTasks.length + 1,
        title: formData.title,
        isFinished: false
      }]
    })

    setFormData({title: ''})
  }

  const handleChangeAddTask = (event) => {
    const {name, value} = event.target

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleRemoveTask = (taskId) => {
    setTasksList(prevTasks => {
      return prevTasks.filter(task => task.taskId !== taskId)
    });
  }

  const tasksListELements = tasksList.map((task) => {
    return (
      <div className="task-item" key={task.taskId}>
        <div className="remove-task">
          <a
            href="#"
            onClick={() => handleRemoveTask(task.taskId)}
          >
            [x]
          </a>
        </div>
        <div className="task-title">
          <input
            type="text"
            name={`task-title-${task.taskId}`}
            value={task.title}
            className="task-input"
            id={task.taskId}
            onChange={handleChangeTaskTitle}
          />
        </div>
        <div className="task-status">
          <input
            type="checkbox"
            checked={task.isFinished}
            id={`custom-checkbox-${task.taskId}`}
            onChange={() => handleFinishedTask(task.taskId)}
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
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              id="title"
              onChange={handleChangeAddTask}
              className="default-input"
            />
          </div>
          <button
            className="add-task-btn"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  )
}

export default TodoList