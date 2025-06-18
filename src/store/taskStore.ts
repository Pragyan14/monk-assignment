import axios from 'axios';
import { create } from 'zustand';

const API_URL = "api/tasks"

type Task = {
  id: string;
  title: string;
  status: 'PENDING' | 'DONE';
  createdAt: string;
};

type TaskStore = {
  tasks: Task[];
  error: string | null;
  isLoading: boolean;
  hasFetched: boolean;

  getTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>; 
  updateTask: (id: string, title:string) => Promise<void>; 
  toggleStatus: (id: string, currentStatus: 'PENDING' | 'DONE') => Promise<void>;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  error: null,
  isLoading: false,
  hasFetched: false,

  getTasks: async () => {
    try {
      const response = await axios.get(API_URL);     
      set({ tasks: response.data, error: null, hasFetched: true });
    } catch (err) {
      set({ error: 'Failed to fetch tasks'});
    }
  },

  addTask: async (title) => {
    try {
      const response = await axios.post(API_URL,{title});
      await get().getTasks();
    } catch {
      set({ error: 'Failed to add task' });
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await get().getTasks();
    } catch {
      set({ error: 'Failed to delete task' });
    }
  },

  updateTask: async(id,title) => {
    try {
      await axios.put(`${API_URL}/${id}`,{id,title});
      await get().getTasks();
    } catch (error) {
      set({ error: 'Failed to update task' });
    }
  },

  toggleStatus: async (id, currentStatus) => {
    const newStatus = currentStatus === "DONE" ? "PENDING" : "DONE";
    try {
      await axios.put(`${API_URL}/${id}`,{status: newStatus});
      await get().getTasks();
    } catch {
      set({ error: 'Failed to update status' });
    }
  },
}));
