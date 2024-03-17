import React, { Component } from "react";

import TasksFilter from "../tasks-filter";

import "./footer.css";

export default class Footer extends Component {

    render() {
        const { todoCount, filter, onFilterChange, onDeletedCompleted} = this.props;

        return (
            <footer className="footer">
                <span className="todo-count">{todoCount} items left</span>
                <TasksFilter filter={filter} onFilterChange={onFilterChange} />
                <button
                    className="clear-completed"
                    onClick={onDeletedCompleted}
                >
                    Clear completed
                </button>
            </footer>
        );
    };
}
