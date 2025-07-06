import type {TaskFilterProps} from "../@types/filter.ts";
import React from "react";


const TaskFilter: React.FC<TaskFilterProps> = ({ filter, onFilterChange, counts }) => {
    return (
        <div className="task-filter">
            <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() : void => onFilterChange('all')}
            >
                All ({counts.all})
            </button>
            <button
                className={filter === 'completed' ? 'active' : ''}
                onClick={() : void => onFilterChange('completed')}
            >
                Completed ({counts.completed})
            </button>
            <button
                className={filter === 'pending' ? 'active' : ''}
                onClick={() : void => onFilterChange('pending')}
            >
                Pending ({counts.pending})
            </button>
        </div>
    );
};
export default TaskFilter;
