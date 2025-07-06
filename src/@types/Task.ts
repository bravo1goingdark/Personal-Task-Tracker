export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
    dueDate?: string;
    priority? : 'low' | 'medium' | 'high';
    tags? : string[];
}

export interface TaskFormProps {
    onAddTask: (task: Task) => void;
}

export interface TaskListProps {
    tasks: Task[];
    filter: 'all' | 'completed' | 'pending';
    searchQuery: string;
    onUpdateTask: (task: Task) => void;
    onDeleteTask: (id: number) => void;
}


