import React from "react";

import "./task.css";

const Task = ({ description, created, completed }) => {
    return (
        <li className={completed ? "completed" : ""}>
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                    <span className="description">{description}</span>
                    <span className="created">{created}</span>
                </label>
                <button className="icon icon-edit" ></button>
                <button className="icon icon-destroy" ></button>
            </div>
        </li>
    );
};

export default Task;