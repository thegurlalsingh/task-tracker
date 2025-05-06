
import React from 'react';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FilterButtonsProps {
  statusFilter: string;
  priorityFilter: string;
  onStatusFilterChange: (status: string) => void;
  onPriorityFilterChange: (priority: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  statusFilter,
  priorityFilter,
  onStatusFilterChange,
  onPriorityFilterChange,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground">Filter Tasks</h3>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Status</p>
          <Tabs 
            defaultValue="all" 
            value={statusFilter}
            onValueChange={onStatusFilterChange}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground mb-2">Priority</p>
          <Tabs 
            defaultValue="all" 
            value={priorityFilter}
            onValueChange={onPriorityFilterChange}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="high">High</TabsTrigger>
              <TabsTrigger value="low">Low</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FilterButtons;
