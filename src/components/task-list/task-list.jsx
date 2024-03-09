import React, { Component } from "react";

import Task from "../task";
import "./task-list.css";

export default class TaskList extends Component {
    render() {
        const { tasks, onDeleted } = this.props;

        return (
            <section className="main">
                <ul className="todo-list">
                    {tasks.map((task)=> (
                        <Task
                            { ...task }
                            onDeleted={ () => onDeleted(task.id) }
                        />
                    ))}
                </ul>
            </section>
        );
    }
}