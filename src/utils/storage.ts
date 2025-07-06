import type {Task} from '../@types/Task';

export const getInitialTasks: () => Task[] = (): Task[] => {
    const saved: string | null = localStorage.getItem('tasks');
    if (saved) return JSON.parse(saved);

    const sampleTasks: Task[] = [
        {
            id: 1,
            title: "Complete React assignment",
            description: "Build a task tracker application",
            completed: false,
            createdAt: "2024-01-15T10:00:00Z",
            dueDate: "2024-01-20",
            priority: "high",
            tags: ["react", "assignment", "university"]
        },
        {
            id: 2,
            title: "Review JavaScript concepts",
            description: "Go through ES6+ features",
            completed: true,
            createdAt: "2024-01-14T15:30:00Z",
            dueDate: "2024-01-18",
            priority: "medium",
            tags: ["javascript", "study", "revision"]
        }, {
            id: 3,
            title: "Prepare project presentation",
            description: "Finalize slides and rehearse before the client meeting.",
            completed: false,
            createdAt: "2025-07-05T14:30:00Z",
            dueDate: "2025-07-08",
            priority: "high",
            tags: ["work", "urgent", "client"]
        }

    ];
    localStorage.setItem('tasks', JSON.stringify(sampleTasks));
    return sampleTasks;
};
