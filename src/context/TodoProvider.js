import React from 'react'
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from 'firebase/firestore'
import { db } from '../configs/firebase'

export const TodoContext = React.createContext()

const TodoProvider = ({ children }) => {
  const [tasksList, setTasksList] = React.useState([])
  const [isLoadingTaskList, setIsLoadingTaskList] = React.useState(true)
  const tasksRef = collection(db, "tasks")

  React.useEffect(() => {
    console.log('Effect Hook has ran')

    const getTasks = async () => {
      const tasksQuery = query(tasksRef, orderBy('createdAt', 'asc'), limit(10))
      await getDocs(tasksQuery).then((data) => {
        setIsLoadingTaskList(false)
        setTasksList(data.docs.map((task) => ({
          ...task.data(),
          id: task.id
        })))
      })
    }

    getTasks()
  }, [])

  return (
    <TodoContext.Provider
      value={{
        tasksList,
        setTasksList,
        isLoadingTaskList,
        setIsLoadingTaskList,
        tasksRef
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider
