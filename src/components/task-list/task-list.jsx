import React, { Component } from "react";
import PropTypes from "prop-types";

import Task from "../task";
import "./task-list.css";


export default class TaskList extends Component {
    static defaultProps = {
        tasks: [],
        onDeleted: () => {},
        onToggleCompleted: () => {},
        onSaveEdit: () => {}
    };

    static propTypes = {
        tasks: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            created: PropTypes.instanceOf(Date).isRequired,
            completed: PropTypes.bool.isRequired,
        })).isRequired,
        onDeleted: PropTypes.func,
        onToggleCompleted: PropTypes.func,
        onSaveEdit: PropTypes.func
    };


    render() {
        const { tasks, onDeleted, onToggleCompleted, onSaveEdit  } = this.props;

        return (
            <section className="main">
                <ul className="todo-list">
                    {tasks.map((task)=> (
                        <Task
                            key={task.id}
                            { ...task }
                            onDeleted={ () => onDeleted(task.id) }
                            onSaveEdit={ onSaveEdit }
                            onToggleCompleted={ () => onToggleCompleted(task.id) }
                        />
                    ))}
                </ul>
            </section>
        );
    }
}