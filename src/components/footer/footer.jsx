import React from "react";

import TasksFilter from "../tasks-filter";

import "./footer.css";


function Footer({ count, filter }) {
    return (
        <footer className="footer">
            <span className="todo-count">{count} items left</span>
            <TasksFilter filter={filter} />
            <button className="clear-completed">
                Clear completed
            </button>
        </footer>
    );
}

export default Footer;