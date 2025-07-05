import React, {useEffect, useState} from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from "./TaskFilter.tsx";
import type {Task} from "../@types/Task";
import type {DashboardProps} from "../@types/props";
import {getInitialTasks} from "../utils/storage.ts";
import SearchBar from "./SearchBar.tsx";

const Dashboard: React.FC<DashboardProps> = ({onLogout}: DashboardProps) => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const username: string | null = localStorage.getItem('username');
    const [tasks, setTasks] = useState<Task[]>((): Task[] => getInitialTasks());
    const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
    const [theme, setTheme] = useState(() : string => localStorage.getItem('theme') || 'light');
    const [searchQuery, setSearchQuery] = useState('');


    const counts = {
        all: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length,
    };


    useEffect((): void => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);


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
                    <button className="add-task-btn"
                            onClick={(): void => setShowForm((prev: boolean): boolean => !prev)}>Add Task
                    </button>
                    <button className="logout" onClick={onLogout}>Logout</button>
                    <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                    </button>
                </div>
            </div>

            <div className="dashboard-container">
                {showForm && <TaskForm onAddTask={handleAddTask}/>}

                <SearchBar query={searchQuery} onChange={setSearchQuery} />
                <TaskFilter filter={filter} onFilterChange={setFilter} counts={counts}/>
                <TaskList
                    tasks={tasks}
                    filter={filter}
                    searchQuery={searchQuery}
                    onUpdateTask={handleUpdateTask}
                    onDeleteTask={handleDeleteTask}
                />

            </div>
        </>
    );
};

export default Dashboard;
