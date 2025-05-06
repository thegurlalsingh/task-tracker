
import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'low';
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  completed,
  priority,
  onToggleComplete,
  onDelete,
}) => {
  return (
    <Card className={cn(
      "mb-4 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md",
      completed ? "bg-gray-50 border-gray-200" : "border-primary/20"
    )}>
      <div className="p-4 flex items-start gap-3">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full h-6 w-6 p-1 flex-shrink-0 transition-colors",
            completed ? "bg-primary text-primary-foreground" : "border-gray-300"
          )}
          onClick={() => onToggleComplete(id)}
          aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {completed && <Check className="h-4 w-4" />}
        </Button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className={cn(
              "text-lg font-medium break-words",
              completed && "line-through text-gray-500"
            )}>
              {title}
            </h3>
            
            <div className="flex items-center gap-2">
              <Badge variant={priority === 'high' ? "destructive" : "secondary"}>
                {priority === 'high' ? 'High' : 'Low'} priority
              </Badge>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-gray-500 hover:text-destructive"
                onClick={() => onDelete(id)}
                aria-label="Delete task"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <p className={cn(
            "text-sm text-gray-600 break-words",
            completed && "text-gray-400"
          )}>
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Task;
