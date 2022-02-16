import React from 'react'
import {Input, Checkbox} from 'antd'

export default function TaskItem(props) {
  const task = props.task
  return (
    <div className="task-item" key={task.id}>
      <div className="remove-task">
        <a
          href="#"
          onClick={() => props.handleRemoveTask(task.id)}
        >
          x
        </a>
      </div>
      <div className="task-title form-input">
        <Input
          placeholder="Task Title"
          bordered={false}
          value={task.title}
          id={task.id}
          onChange={props.handleChangeTaskTitle}
          onBlur={() => props.handleBlurTaskTitle(task.id, task.title)}
        />
      </div>
      <div className="task-status">
        <Checkbox
          name="status"
          id={`custom-checkbox-${task.id}`}
          checked={task.status}
          onChange={() => props.handleTaskStatusFinished(task.id)}
        >
        </Checkbox>
      </div>
    </div>
  )
}
