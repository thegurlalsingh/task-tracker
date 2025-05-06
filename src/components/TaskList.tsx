
import React from 'react';
import { AlertCircle } from 'lucide-react';
import Task from './Task';
import { Alert, AlertDescription } from '@/components/ui/alert';

export interface ITask {
  _id: string; // MongoDB uses _id
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'low';
}

interface TaskListProps {
  tasks: ITask[];
  statusFilter: string;
  priorityFilter: string;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  statusFilter,
  priorityFilter,
  onToggleComplete,
  onDelete,
}) => {
  const filteredTasks = tasks.filter(task => {
    // Filter by status
    if (statusFilter === 'completed' && !task.completed) return false;
    if (statusFilter === 'incomplete' && task.completed) return false;
    
    // Filter by priority
    if (priorityFilter === 'high' && task.priority !== 'high') return false;
    if (priorityFilter === 'low' && task.priority !== 'low') return false;
    
    return true;
  });

  if (tasks.length === 0) {
    return (
      <Alert className="bg-primary/10 border-primary/20">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No tasks yet. Add a task to get started!
        </AlertDescription>
      </Alert>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <Alert className="bg-primary/10 border-primary/20">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No tasks match your current filters.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map(task => (
        <Task
          key={task._id}
          id={task._id}
          title={task.title}
          description={task.description}
          completed={task.completed}
          priority={task.priority}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
