"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { useTaskStore } from "@/store/taskStore"

interface Task {
  id: string
  text: string
  status: "pending" | "done"
}

export default function TaskFlow() {

  const {tasks, addTask, setTask} = useTaskStore();

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");

  const handleAdd = async () => {

  }
  
  // const [tasks, setTasks] = useState<Task[]>([
  //   { id: 1, text: "Complete project documentation", status: "pending" },
  //   { id: 2, text: "Review team feedback", status: "done" },
  //   { id: 3, text: "Schedule client meeting", status: "pending" },
  // ])
  // const [inputValue, setInputValue] = useState("")
  // const [filter, setFilter] = useState<"all" | "pending" | "done">("all")
  // const [editingId, setEditingId] = useState<number | null>(null)
  // const [editingText, setEditingText] = useState("")

  // const addTask = () => {
  //   if (inputValue.trim()) {
  //     setTasks([
  //       ...tasks,
  //       {
  //         id: Date.now(),
  //         text: inputValue.trim(),
  //         status: "pending",
  //       },
  //     ])
  //     setInputValue("")
  //   }
  // }

  const toggleTask = (id: number) => {
      // setTask(
      //   tasks.map((task) =>
      //     task.id === id ? { ...task, status: task.status === "PENDING" ? "DONE" : "PENDING" } : task,
      //   ),
      // )
  }

  // const deleteTask = (id: number) => {
  //   setTasks(tasks.filter((task) => task.id !== id))
  // }

  // const startEditing = (id: number, text: string) => {
  //   setEditingId(id)
  //   setEditingText(text)
  // }

  // const saveEdit = (id: number) => {
  //   if (editingText.trim()) {
  //     setTasks(tasks.map((task) => (task.id === id ? { ...task, text: editingText.trim() } : task)))
  //   }
  //   setEditingId(null)
  //   setEditingText("")
  // }

  // const cancelEdit = () => {
  //   setEditingId(null)
  //   setEditingText("")
  // }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    return task.status === filter
  })

  const totalTasks = tasks.length
  const pendingTasks = tasks.filter((task) => task.status === "PENDING").length
  const completedTasks = tasks.filter((task) => task.status === "DONE").length

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">TaskFlow</h1>
          <p className="text-gray-600 text-lg">Simple. Clean. Productive.</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">Your Tasks</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "all" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("done")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "done" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Done
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                {filter === "all" ? "No tasks yet. Add one above!" : `No ${filter} tasks.`}
              </p>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={task.status === "DONE"}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
                    disabled={editingId === task.id}
                  />
                  <div className="flex-1">
                    {editingId === task.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(task.id)}
                            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p
                          className={`font-medium ${
                            task.status === "DONE" ? "text-gray-500 line-through" : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </p>  
                      </>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {editingId === task.id ? null : (
                      <button
                        onClick={() => startEditing(task.id, task.text)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      disabled={editingId === task.id}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Score Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">{totalTasks}</div>
              <div className="text-blue-100">Total Tasks</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">{pendingTasks}</div>
              <div className="text-blue-100">Pending</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">{completedTasks}</div>
              <div className="text-blue-100">Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
