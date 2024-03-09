import React, { Component } from "react";

import "./task.css";

export default class Task extends Component {
    state = {
        completed: false
    };

    onLabelClick = () => {
        this.setState( ({ completed }) => {
            return {
                completed: !completed
            };
        });
    }
    render() {
        const { description, created, onDeleted } = this.props;

        let classNames = '';

        return (
            <li className={classNames}>
                <div className="view">
                    <input className="toggle" type="checkbox" />
                    <label onClick = {this.onLabelClick}>
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
