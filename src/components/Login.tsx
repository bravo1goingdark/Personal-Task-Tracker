import React, {type ChangeEvent, useState} from 'react';
import type {LoginProps} from "../@types/props.ts";

const Login: React.FC<LoginProps> = ({onLogin}: LoginProps) => {
    const [username, setUsername] = useState<string>('');

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (!username.trim()) return;
        onLogin(username.trim());
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setUsername(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
