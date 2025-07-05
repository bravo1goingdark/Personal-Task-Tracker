


export interface LoginProps {
    onLogin: (username: string) => void;
}

export interface DashboardProps {
    onLogout: () => void;
}

export interface SearchBarProps {
    query: string;
    onChange: (query: string) => void;
}