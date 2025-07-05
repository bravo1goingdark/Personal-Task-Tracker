import React, {type ChangeEvent} from 'react';
import type {SearchBarProps} from "../@types/props.ts";


const SearchBar: React.FC<SearchBarProps> = ({ query, onChange }) => {
    return (
        <div className="search-bar">
            <input
                className="search-bar-input"
                type="text"
                placeholder="🔍 Search tasks..."
                value={query}
                onChange={(e : ChangeEvent<HTMLInputElement>) : void => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
