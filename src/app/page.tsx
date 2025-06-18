"use client"

import { useState, useEffect } from "react"
import { Edit2, Trash2, Loader, Check, X } from "lucide-react"
import { useTaskStore } from "@/store/taskStore"
import toast from "react-hot-toast";

export default function TaskFlow() {

  const { tasks, addTask, getTasks, deleteTask, hasFetched, error, updateTask, toggleStatus } = useTaskStore();

  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const handleAdd = async () => {
    await addTask(newTask);
  }

  const toggleTaskStatus = async (id: string, currentStatus: "PENDING" | "DONE") => {
    await toggleStatus(id, currentStatus);
  }

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    if (!error) {
      toast.success("Task Deleted")
    }
  }

  const handleUpdate = async (id: string, title: string) => {
    await updateTask(id, title);
    if (!error) {
      setEditingId(null)
      setEditingText("")
      toast.success("Task Updated")
    }
  }

  const startEditing = (id: string, title: string) => {
    setEditingId(id)
    setEditingText(title)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText("")
  }


  const totalTasks = tasks.length
  const pendingTasks = tasks.filter((task) => task.status === "PENDING").length
  const completedTasks = tasks.filter((task) => task.status === "DONE").length

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Header  */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">TaskFlow</h1>
          <p className="text-gray-600 text-lg">Simple. Clean. Productive.</p>
        </div>


        {/* Input */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              required={true}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="submit"
              value="Add Task"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            />
          </form>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 sm:mb-0">Your Tasks</h2>
          </div>

          <div className="space-y-3">
            {!hasFetched ? (
              <Loader className="animate-spin mx-auto" />
            ) : tasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No tasks yet. Add one above!
              </p>
            ) : (
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 p-4 justify-between border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {editingId !== task.id ? (
                      <>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={task.status === "DONE"}
                            onChange={() => toggleTaskStatus(task.id, task.status)}
                            className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
                          />
                          <p
                            className={`font-medium ${task.status === "DONE"
                              ? "text-gray-500 line-through"
                              : "text-gray-800 "
                              }`}
                          >
                            {task.title}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditing(task.id, task.title)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-row md:flex-row md:items-center md:justify-between gap-4 w-full">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              autoFocus
                            />
                          </div>

                          {/* Action buttons */}
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={cancelEdit}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X size={24} />
                            </button>
                            <button
                              onClick={() => handleUpdate(editingId, editingText)}
                              className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              <Check size={24} />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </ul>
            )}
          </div>


        </div>

        {/* Score Section */}
        <div className="sticky bottom-2">
          <div className="bg-gradient-to-r from-blue-500/90 to-purple-600/90 rounded-lg p-6 text-white">
            <div className="grid grid-cols-3 gap-6 text-center">
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
    </div>
  )
}
