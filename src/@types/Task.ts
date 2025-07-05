export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
}

export interface TaskFormProps {
    onAddTask: (task: Task) => void;
}

export interface TaskListProps {
    tasks: Task[];
    onUpdateTask: (task: Task) => void;
    onDeleteTask: (id: number) => void;
    filter: 'all' | 'completed' | 'pending';
}

