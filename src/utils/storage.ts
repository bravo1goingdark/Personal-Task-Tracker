import type {Task} from '../@types/Task';

export const getInitialTasks: () => Task[] = (): Task[] => {
    const saved : string | null = localStorage.getItem('tasks');
    if (saved) return JSON.parse(saved);

    const sampleTasks: Task[] = [
        {
            id: 1,
            title: "Complete React assignment",
            description: "Build a task tracker application",
            completed: false,
            createdAt: "2024-01-15T10:00:00Z"
        },
        {
            id: 2,
            title: "Review JavaScript concepts",
            description: "Go through ES6+ features",
            completed: true,
            createdAt: "2024-01-14T15:30:00Z"
        }
    ];
    localStorage.setItem('tasks', JSON.stringify(sampleTasks));
    return sampleTasks;
};
