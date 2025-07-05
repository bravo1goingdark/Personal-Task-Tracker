// src/components/TaskForm.tsx
import React, {type ChangeEvent, useState} from 'react';
import type {Task, TaskFormProps} from "../@types/Task.ts";


const TaskForm: React.FC<TaskFormProps> = ({onAddTask}: TaskFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newTask: Task = {
            id: Date.now(),
            title: title.trim(),
            description: description.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
            dueDate: dueDate || undefined,
        };

        onAddTask(newTask);
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} style={{marginBottom: '2rem'}}>
            <input
                type="text"
                placeholder="Task title *"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Task description"
                value={description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => setDescription(e.target.value)}
                style={{marginTop: '1rem', padding: '12px', width: '100%', fontSize: '1rem', borderRadius: '6px'}}
            />
            <label className="due-date-label">
                Due Date
                <input
                    className="due-date-input"
                    type="date"
                    value={dueDate}
                    onChange={(e : ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
                />
            </label>

            <button type="submit" style={{marginTop: '1rem'}}>Add Task</button>
        </form>
    );
};

export default TaskForm;
