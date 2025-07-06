import React, {type ChangeEvent, useState} from 'react';
import type {TaskListProps, Task} from '../@types/Task';

const TaskList: React.FC<TaskListProps> = ({tasks, onUpdateTask, onDeleteTask, filter, searchQuery}: TaskListProps) => {
    const [editTaskId, setEditTaskId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState<string>('');
    const [editDescription, setEditDescription] = useState<string>('');

    const startEditing = (task: Task) => {
        setEditTaskId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description || '');
    };

    const handleSave = (task: Task) => {
        const updated = {
            ...task,
            title: editTitle.trim(),
            description: editDescription.trim(),
        };
        onUpdateTask(updated);
        setEditTaskId(null);
    };

    const handleToggle = (task: Task) => {
        onUpdateTask({...task, completed: !task.completed});
    };

    const handleDelete = (id: number): void => {
        if (confirm('Are you sure you want to delete this task?')) {
            onDeleteTask(id);
        }
    };

    const filteredTasks: Task[] = tasks
        .filter((task: Task): boolean | undefined => {
            if (filter === 'all') return true;
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
        })
        .filter((task: Task): boolean | undefined =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );


    const isOverdue: (dueDate?: string | undefined) => boolean = (dueDate?: string): boolean => {
        if (!dueDate) return false;
        const due = new Date(dueDate);
        const now = new Date();
        return due < now && due.toDateString() !== now.toDateString();
    };

    return (
        <div className="task-list">
            {filteredTasks.length === 0 ? (
                <p>No tasks to show.</p>
            ) : (
                filteredTasks.map((task: Task) => (
                    <div key={task.id} className="task-item">
                        {editTaskId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEditTitle(e.target.value)}
                                />
                                <textarea
                                    value={editDescription}
                                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEditDescription(e.target.value)}
                                />
                                <button onClick={(): void => handleSave(task)}>Save</button>
                                <button onClick={(): void => setEditTaskId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <div className="task-header">
                                    <h3>{task.title}</h3>
                                    <span className="task-date">
                                      {new Date(task.createdAt).toLocaleString()}
                                    </span>
                                </div>

                                {task.description && <p>{task.description}</p>}

                                {task.dueDate && (
                                    <p className={`due-date ${isOverdue(task.dueDate) && !task.completed ? 'overdue' : ''}`}>
                                        📅 Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </p>
                                )}

                                <div className="task-badges">
                                    <span className={`status ${task.completed ? 'done' : 'pending'}`}>
                                         {task.completed ? '✅ Completed' : '⏳ Pending'}
                                    </span>

                                    {task.priority && (
                                        <span className={`priority-badge ${task.priority}`}>
                                            {task.priority === 'low' && '🟢 Low'}
                                            {task.priority === 'medium' && '🟡 Medium'}
                                            {task.priority === 'high' && '🔴 High'}
                                        </span>
                                    )}
                                </div>

                                {task.tags && task.tags.length > 0 && (
                                    <div className="task-tags">
                                        {task.tags.map((tag, index) => (
                                            <span key={index} className="tag-badge">#{tag}</span>
                                        ))}
                                    </div>
                                )}


                                <div className="task-actions">
                                    <button onClick={() => handleToggle(task)}>
                                        {task.completed ? 'Mark Pending' : 'Mark Done'}
                                    </button>
                                    <button onClick={() => startEditing(task)}>Edit</button>
                                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskList;
