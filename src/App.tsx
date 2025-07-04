import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from "./components/DashBoard.tsx";

const App: React.FC = () => {
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                        !username ? (
                            <Login onLogin={(name) => {
                                localStorage.setItem('username', name);
                                setUsername(name);
                            }} />
                        ) : (
                            <Navigate to="/dashboard" />
                        )
                    }
                />
                <Route path="/dashboard" element={
                        username ? (
                            <Dashboard onLogout={() => {
                                localStorage.removeItem('username');
                                setUsername(null);
                            }} />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
