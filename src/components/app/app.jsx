import React from 'react';

import NewTaskList from "../new-task-list";
import TaskList from "../task-list";
import Footer from "../footer";

import "./app.css";

const App = () => {

    const task = {
        id: 1,
        description: 'description',
        created: new Date().toString(),
        completed: false
    }

    const filter = 'filter';
    const count = 1;

    return (
        <section className="todoapp">
            <NewTaskList />
            <TaskList task={task}/>
            <Footer count={count} filter={filter}/>
        </section>
    );
};

export default App;