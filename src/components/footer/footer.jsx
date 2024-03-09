import React, { Component } from "react";

import TasksFilter from "../tasks-filter";

import "./footer.css";

export default class Footer extends Component {

    render() {
        const { count, filter } = this.props;

        return (
            <footer className="footer">
                <span className="todo-count">{count} items left</span>
                <TasksFilter filter={filter} />
                <button className="clear-completed">
                    Clear completed
                </button>
            </footer>
        );
    };
}
