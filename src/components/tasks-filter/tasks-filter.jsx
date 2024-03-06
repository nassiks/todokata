import React from "react";

import "./tasks-filter.css";

function TasksFilter({ filter }) {
    const buttons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'completed', label: 'Completed' }
    ];

    return (
        <ul className="filters">
            {buttons.map(({ name, label }) => (
                <li key={name}>
                    <button
                        className={filter === name ? "selected" : ""}>
                        {label}
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default TasksFilter;