import React, {useEffect, useState} from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import type {Task} from "../@types/Task";
import type {DashboardProps} from "../@types/props";

const Dashboard: React.FC<DashboardProps> = ({onLogout}) => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const username: string | null = localStorage.getItem('username');
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved: string | null = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect((): void => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask: (task: Task) => void = (task: Task) => {
        setTasks([task, ...tasks]);
    };

    const handleUpdateTask: (updatedTask: Task) => void = (updatedTask: Task) => {
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    };

    const handleDeleteTask: (taskId: number) => void = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId));
    };


    return (
        <>
            <div className="dashboard-navbar">
                <span className="username">Welcome, {username}!</span>
                <div className="nav-actions">
                    <button className="add-task-btn" onClick={(): void => setShowForm((prev) => !prev)}>+</button>
                    <button className="logout" onClick={onLogout}>Logout</button>
                </div>
            </div>

            <div className="dashboard-container">
                {showForm && <TaskForm onAddTask={handleAddTask}/>}
                <TaskList
                    tasks={tasks}
                    onUpdateTask={handleUpdateTask}
                    onDeleteTask={handleDeleteTask}
                />
            </div>
        </>
    );
};

export default Dashboard;
