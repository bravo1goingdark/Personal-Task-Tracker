import React, {type ChangeEvent, useState} from 'react';
import type {Task} from '../@types/Task';

interface TaskListProps {
    tasks: Task[];
    onUpdateTask: (updatedTask: Task) => void;
    onDeleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({tasks, onUpdateTask, onDeleteTask}) => {
    const [editTaskId, setEditTaskId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

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

    const handleDelete: (id: number) => void = (id: number) => {
        if (confirm('Are you sure you want to delete this task?')) {
            onDeleteTask(id);
        }
    };

    return (
        <div className="task-list"> {tasks.length === 0 ? (<p>No tasks yet.</p>)
            : (
                tasks.map((task: Task) => (
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
                                <span className={`status ${task.completed ? 'done' : 'pending'}`}>
                  {task.completed ? '✅ Completed' : '⏳ Pending'}
                </span>

                                <div className="task-actions">
                                    <button onClick={(): void => handleToggle(task)}>
                                        {task.completed ? 'Mark Pending' : 'Mark Done'}
                                    </button>
                                    <button onClick={(): void => startEditing(task)}>Edit</button>
                                    <button onClick={(): void => handleDelete(task.id)}>Delete</button>
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
