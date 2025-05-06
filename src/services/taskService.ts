
import { ITask } from '@/components/TaskList';

// Mock data
let tasks: ITask[] = [
  {
    id: '1',
    title: 'Complete MERN project',
    description: 'Finish the Task Tracker app with all requirements',
    completed: false,
    priority: 'high',
  },
  {
    id: '2',
    title: 'Learn about React hooks',
    description: 'Study useState, useEffect, and custom hooks',
    completed: true,
    priority: 'high',
  },
  {
    id: '3',
    title: 'Go for a run',
    description: 'Run 5km in the park',
    completed: false,
    priority: 'low',
  },
];

// Mock API service
const taskService = {
  // GET /tasks – fetch all tasks
  getTasks: async (): Promise<ITask[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...tasks];
  },

  // POST /tasks – add a new task
  addTask: async (task: Omit<ITask, 'id' | 'completed'>): Promise<ITask> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newTask: ITask = {
      ...task,
      id: Date.now().toString(),
      completed: false,
    };
    
    tasks = [newTask, ...tasks];
    return newTask;
  },

  // PUT /tasks/:id – update task status
  updateTaskStatus: async (id: string, completed: boolean): Promise<ITask> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      completed,
    };
    
    tasks[taskIndex] = updatedTask;
    return updatedTask;
  },

  // DELETE /tasks/:id – delete a task
  deleteTask: async (id: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    tasks = tasks.filter(t => t.id !== id);
  },
};

export default taskService;
