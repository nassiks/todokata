import React from "react";

import Task from "../task";
import "./task-list.css";

const TaskList = ({ task }) => {
    return (
        <section className="main">
            <ul className="todo-list">
                    <Task
                        key={task.id}
                        description={task.description}
                        created={task.created}
                        completed={task.completed}
                    />
            </ul>
        </section>
    );
};

export default TaskList;