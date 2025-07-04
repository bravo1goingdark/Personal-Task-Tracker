import React from 'react';

import type {DashboardProps} from "../@types/props.ts";

const Dashboard: React.FC<DashboardProps> = ({onLogout}: DashboardProps) => {
    const username: string | null = localStorage.getItem('username');

    return (
        <div className="dashboard-container">
            <h2>Welcome, {username}!</h2>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
