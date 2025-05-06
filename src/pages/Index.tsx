
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, LogOut } from 'lucide-react';
import TaskForm from '@/components/TaskForm';
import TaskList, { ITask } from '@/components/TaskList';
import FilterButtons from '@/components/FilterButtons';
import CongratsModal from '@/components/CongratsModal';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showCongrats, setShowCongrats] = useState(false);
  const navigate = useNavigate();
  
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user?.token;

  useEffect(() => {
    // Redirect to landing if no token
    if (!token) {
      navigate('/landing');
      return;
    }
    
    fetchTasks();
  }, [token, navigate]);

  useEffect(() => {
    // Check if all tasks are completed and there's at least one task
    if (tasks.length > 0 && tasks.every(task => task.completed)) {
      setShowCongrats(true);
    }
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://task-master-zenith-plus.onrender.com/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (task: { title: string; description: string; priority: 'high' | 'low' }) => {
    try {
      const response = await fetch('https://task-master-zenith-plus.onrender.com/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(task),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      
      const newTask = await response.json();
      setTasks(prev => [newTask, ...prev]);
      toast.success('Task added successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add task');
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      const task = tasks.find(t => t._id === id); // Fixed: use _id instead of id
      if (!task) return;
      
      const response = await fetch(`https://task-master-zenith-plus.onrender.com/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completed: !task.completed }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      
      const updatedTask = await response.json();
      setTasks(prev => prev.map(t => t._id === id ? updatedTask : t));
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://task-master-zenith-plus.onrender.com/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      
      setTasks(prev => prev.filter(t => t._id !== id)); // Fixed: use _id instead of id
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/landing');
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
              Task Tracker
            </h1>
            <p className="text-gray-500 mt-2">
              Welcome, {user?.username || 'User'}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </header>

        <TaskForm onAddTask={handleAddTask} />
        
        <FilterButtons 
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onStatusFilterChange={setStatusFilter}
          onPriorityFilterChange={setPriorityFilter}
        />
        
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
          />
        )}
        
        <CongratsModal 
          open={showCongrats}
          onClose={() => setShowCongrats(false)}
        />
      </div>
    </div>
  );
};

export default Index;
