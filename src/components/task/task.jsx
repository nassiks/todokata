import React, { Component } from "react";

import "./task.css";

export default class Task extends Component {
    render() {
        const { description, created, completed, onDeleted, onToggleCompleted} = this.props;

        let classNames = completed ? 'completed' : '';

        return (
            <li className={classNames}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={completed} onChange = {onToggleCompleted}/>
                    <label>
                        <span className="description">{description}</span>
                        <span className="created">{created}</span>
                    </label>
                    <button className="icon icon-edit" ></button>
                    <button
                        className="icon icon-destroy"
                        onClick={onDeleted}
                    >
                    </button>
                </div>
            </li>
        );
    }
}
