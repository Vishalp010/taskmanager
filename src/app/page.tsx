'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, removeTask, updateTask } from './features/taskmanager/taskManagerSlice'
import { RootState } from './store/store'
import { toast, Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const HomePage = () => {
  const router = useRouter()
  // const logout = async () => {
  //   try {
  //     await axios.get('/api/users/logout')
  //     toast.success("Logout successful")
  //     router.push('/login')
  //   } catch (error: any) {
  //     console.log(error.message)
  //     toast.error(error.message)
  //   }
  // }
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success("Logout successful");
      router.push('/login');
    } catch (error: unknown) { // Use 'unknown' instead of 'any'
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        console.log(error.message);
        toast.error(error.message);
      } else {
        // Handle unexpected error
        console.log("An unexpected error occurred:", error);
        toast.error("Something went wrong.");
      }
    }
  };
  

  const [taskText, setTaskText] = useState("") // State to track new task input
  const [editText, setEditText] = useState("") // State to track edit input
  const [editId, setEditId] = useState("") // State to track the task being edited
  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.task.tasks)

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(addTask(taskText))
      setTaskText("")
    }
  }

  const handleRemoveTask = (id: string) => {
    dispatch(removeTask(id))
  }

  const handleUpdateTask = () => {
    if (editText.trim() && editId) {
      dispatch(updateTask({ id: editId, text: editText }))
      setEditText("")
      setEditId("")
    }
  }

  const handleEdit = (task: { id: string, text: string }) => {
    setEditId(task.id)
    setEditText(task.text)
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center bg-gray-100">
      <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 w-full max-w-lg h-full overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

        {/* Add Task */}
        <div className="flex flex-col sm:flex-row items-center gap-2 mb-4 w-full">
          <input
            type="text"
            placeholder="Enter new task"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full sm:w-80"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto"
          >
            Add Task
          </button>
        </div>

        {/* Edit Task */}
        {editId && (
          <div className="flex flex-col sm:flex-row items-center gap-2 mb-4 w-full">
            <input
              type="text"
              placeholder="Edit task"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full sm:w-80"
            />
            <button
              onClick={handleUpdateTask}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto"
            >
              Update Task
            </button>
          </div>
        )}

        {/* Task List */}
        <ul className="w-full max-w-lg overflow-y-auto overflow-x-auto max-h-[400px] mb-4">
          {tasks.map((task: { id: string; text: string }) => (
            <li
              key={task.id}
              className="flex flex-col items-start justify-between bg-white shadow p-4 rounded mb-2 max-w-full min-h-[50px] max-h-[200px] overflow-x-auto break-words margin-y-auto whitespace-nowrap "
            >
              <span className="text-sm sm:text-base">{task.text}</span>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveTask(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
      {/* Logout Button */}
      <button
        className="w-[30%] h-[10%] mb-2 bg-slate-600 rounded-md text-white mt-2"
        onClick={logout}
      >
        Logout
      </button>
      <Toaster />
    </div>
  )
}

export default HomePage
