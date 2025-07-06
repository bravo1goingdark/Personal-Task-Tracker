import React, {type ChangeEvent, useState} from 'react';
import type {Task, TaskFormProps} from "../@types/Task";

const TaskForm: React.FC<TaskFormProps> = ({onAddTask}: TaskFormProps) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [tags, setTags] = useState<string>('');


    const handleSubmit = (e: React.FormEvent) : void => {
        e.preventDefault();
        if (!title.trim()) return;

        const newTask: Task = {
            id: Date.now(),
            title: title.trim(),
            description: description.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
            dueDate: dueDate || undefined,
            priority,
            tags: tags
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0),
        };

        onAddTask(newTask);
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('medium');
        setTags('');
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
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                style={{
                    marginTop: '1rem',
                    padding: '12px',
                    width: '100%',
                    fontSize: '1rem',
                    borderRadius: '6px',
                }}
            />
            <div className="form-row">
                <label className="due-date-label">
                    Due Date
                    <input
                        className="due-date-input"
                        type="date"
                        value={dueDate}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
                    />
                </label>
                <label>
                    Priority
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                    >
                        <option value="low">🟢 Low</option>
                        <option value="medium">🟡 Medium</option>
                        <option value="high">🔴 High</option>
                    </select>
                </label>
            </div>
            <label>
                Tags (comma-separated)
                <input
                    type="text"
                    placeholder="e.g. Work, Personal, Urgent"
                    value={tags}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTags(e.target.value)}
                />
            </label>


            <button type="submit" style={{marginTop: '1rem'}}>Add Task</button>
        </form>
    );
};

export default TaskForm;
