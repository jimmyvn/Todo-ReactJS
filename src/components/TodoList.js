import React from "react"
import { db } from '../configs/firebase'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit
} from 'firebase/firestore'
import {
  Form,
  Button,
  Input,
  Checkbox
} from "antd"

const TodoList = () => {
  const [tasksList, setTasksList] = React.useState([])
  const tasksRef = collection(db, "tasks")
  const [form] = Form.useForm()

  const [addTaskButtonLoading, setAddTaskButtonLoading] = React.useState(false);

  React.useEffect(() => {
    console.log('Effect Hook has ran')

    const getTasks = async () => {
      const tasksQuery = query(tasksRef, orderBy('createdAt', 'asc'), limit(10))
      const data = await getDocs(tasksQuery)
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

  const handleTaskStatusFinished = async (id) => {
    console.log('The task status is saving')
    setTasksList(prevTasks => {
      return prevTasks.map(prevTask => {
        return prevTask.id == id ? {...prevTask, status: !prevTask.status} : prevTask
      })
    })

    const taskDocRef = doc(db, 'tasks', id)
    const taskDoc = await getDoc(taskDocRef)
    
    await updateDoc(taskDocRef, {
      status: !taskDoc.data().status,
      updatedAt: new Date().toISOString()
    }).then(() => {
      console.log('The task status has been saved')
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleSubmitAddTaskForm = async (event) => {
    event.preventDefault()

    const formData = form.getFieldsValue();

    if (formData.title === undefined) {
      console.log('The title must be not empty')
      return
    }

    setAddTaskButtonLoading(true)

    await addDoc(tasksRef, {
      ...formData,
      status: formData.status !== undefined ? formData.status : false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }).then((doc) => {
      setTasksList(prevTasks => {
        return [...prevTasks, {
          id: doc.id,
          title: formData.title,
          createdAt: formData.createdAt,
          updatedAt: formData.updatedAt,
        }]
      })
      setAddTaskButtonLoading(false)
    })
    
    form.resetFields();
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
          <Input
            placeholder="Task Title"
            bordered={false}
            value={task.title}
            id={task.id}
            onChange={handleChangeTaskTitle}
            onBlur={() => handleBlurTaskTitle(task.id, task.title)}
          />
        </div>
        <div className="task-status">
          <Checkbox
            name="status"
            id={`custom-checkbox-${task.id}`}
            checked={task.status}
            onChange={() => handleTaskStatusFinished(task.id)}
          >
          </Checkbox>
        </div>
      </div>
    )
  })
  
  return (
    <div className="todo-list-parent">

      {tasksList.length > 0 ? tasksListELements : <p>You're all caught up</p> }
      
      <Form
        form={form}
        name="add-task"
        layout="vertical"
        initialValues={{ remember: true }}
        onSubmitCapture={handleSubmitAddTaskForm}
        autoComplete="off"
      >
        <Form.Item
          label="Task title"
          name="title"
          rules={[{ required: true, message: 'Please provide the title!' }]}
        >
          <Input allowClear/>
        </Form.Item>
        <Form.Item
          label="Task status"
          name="status"
          valuePropName="checked"
        >
          <Checkbox>Status</Checkbox>
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={addTaskButtonLoading}
        >
          Add Task
        </Button>
      </Form>
    </div>
  )
}

export default TodoList