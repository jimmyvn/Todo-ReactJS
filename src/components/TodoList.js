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

  const tasksListELements = tasksList.map((task) => {
    return (
      <div className="task-item" key={task.taskId}>
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
  
  return tasksListELements
}

export default TodoList