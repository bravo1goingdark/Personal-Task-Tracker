import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import type { Task } from "../@types/Task.ts";
import type { DashboardProps } from "../@types/props.ts";

const Dashboard: React.FC<DashboardProps> = ({ onLogout }: DashboardProps) => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const username: string | null = localStorage.getItem('username');
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved: string | null = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect((): void => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask: (task: Task) => void = (task: Task): void => {
        setTasks([task, ...tasks]);
    };

    return (
        <>
            <div className="dashboard-navbar">
                <span className="username">Welcome, {username}!</span>
                <div className="nav-actions">
                    <button className="add-task-btn" onClick={() => setShowForm((prev) => !prev)}>+</button>
                    <button className="logout" onClick={onLogout}>Logout</button>
                </div>
            </div>

            <div className="dashboard-container">
                {showForm && <TaskForm onAddTask={handleAddTask} />}

                <div className="task-list">
                    {tasks.length === 0 ? (
                        <p>No tasks yet.</p>
                    ) : (
                        tasks.map((task) => (
                            <div key={task.id} className="task-item">
                                <div className="task-header">
                                    <h3>{task.title}</h3>
                                    <span className="task-date">{new Date(task.createdAt).toLocaleString()}</span>
                                </div>
                                {task.description && <p>{task.description}</p>}
                                <span className={`status ${task.completed ? 'done' : 'pending'}`}>
                                    {task.completed ? '✅ Completed' : '⏳ Pending'}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
