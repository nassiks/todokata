import React, { Component } from 'react';

import NewTaskList from "../new-task-list";
import TaskList from "../task-list";
import Footer from "../footer";

import "./app.css";

export default class App extends Component {

    state = {
        todoData: [
            {id: 1, description: 'one', created: new Date().toString()},
            {id: 2, description: 'two', created: new Date().toString()},
            {id: 3, description: 'three', created: new Date().toString()}
        ],
    };

    get count () {
        return this.state.todoData.length;
    }

    onDeleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            };
        });
    };

    filter = 'filter';
    render() {
        return (
            <section className="todoapp">
                <NewTaskList />
                <TaskList
                    tasks={this.state.todoData}
                    onDeleted={this.onDeleteItem}
                />
                <Footer count={this.count} filter={this.filter}/>
            </section>
        );
    }
}
