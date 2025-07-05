export interface TaskFilterProps {
    filter: 'all' | 'completed' | 'pending';
    onFilterChange: (filter: 'all' | 'completed' | 'pending') => void;
    counts: {
        all: number;
        completed: number;
        pending: number;
    };
}
