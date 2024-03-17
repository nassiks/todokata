import React, { Component } from 'react';

import NewTaskList from "../new-task-list";
import TaskList from "../task-list";
import Footer from "../footer";

import "./app.css";

export default class App extends Component {

    maxId = 1;

    state = {
        todoData: [],
        filter: 'all'
    };

    createTodoItem(description) {
        return {
            id: this.maxId++,
            description,
            created: new Date().toISOString(),
            completed: false
        };
    };

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

    onDeletedCompleted = () => {
        this.setState(({ todoData }) => ({
            todoData: todoData.filter(el => !el.completed)
        }));
    }

    onItemAdded = (description) => {
        const newItem = this.createTodoItem(description);

        this.setState(({ todoData }) => {
            const newArr = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArr
            }
        });
    };

    onToggleCompleted = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const oldItem = todoData[idx];
            const newItem = { ...oldItem, completed: !oldItem.completed};

            const newArray = [
                ...todoData.slice(0, idx),
                newItem,
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            };
        });
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    filterTasks = (todoData, filter) => {
        switch (filter) {
            case 'all':
                return this.state.todoData;
            case 'active':
                return this.state.todoData.filter(el => !el.completed);
            case 'completed':
                return this.state.todoData.filter(el => el.completed);
            default:
                return this.state.todoData;
        }
    };


    render() {
        const { todoData, filter } = this.state;
        const completedCount = this.state.todoData.filter((el) => el.completed).length;
        const todoCount = this.state.todoData.length - completedCount;
        const visibleItems = this.filterTasks(todoData, filter);

        return (

            <section className="todoapp">
                <NewTaskList onItemAdded={this.onItemAdded}/>
                <TaskList
                    tasks={visibleItems}
                    onDeleted={this.onDeleteItem}
                    onToggleCompleted={this.onToggleCompleted}
                />
                <Footer todoCount={todoCount} filter={filter} onFilterChange={this.onFilterChange} onDeletedCompleted={this.onDeletedCompleted}/>
            </section>
        );
    }
}
