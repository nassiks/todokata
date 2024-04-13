import React, { Component } from 'react'

import NewTaskList from '../new-task-list'
import TaskList from '../task-list'
import Footer from '../footer'
import './app.css'
export default class App extends Component {
  maxId = 0
  state = {
    todoData: [],
    filter: 'all',
    timerTimes: {},
  }

  startTimer = (id) => {
    if (!this.state.timerTimes[id].running && this.state.timerTimes[id].time > 0) {
      this.updateTimer(id, { running: true })
      this.timers[id] = setInterval(() => {
        let currentTime = this.state.timerTimes[id].time
        if (currentTime > 0) {
          this.updateTimer(id, { time: currentTime - 1 })
        } else {
          this.stopTimer(id)
        }
      }, 1000)
    }
  }

  updateTimer = (id, update) => {
    this.setState((prevState) => ({
      timerTimes: {
        ...prevState.timerTimes,
        [id]: {
          ...prevState.timerTimes[id],
          ...update,
        },
      },
    }))
  }
  pauseTimer = (id) => {
    clearInterval(this.timers[id])
    this.updateTimer(id, { running: false })
  }

  stopTimer = (id) => {
    clearInterval(this.timers[id])
    const { running, finished, time } = this.state.timerTimes[id]
    if (running || !finished || time !== 0) {
      this.updateTimer(id, { running: false, finished: true, time: 0 })
    }
  }

  componentDidMount() {
    this.timers = {}
  }
  componentWillUnmount() {
    Object.keys(this.timers).forEach((timerId) => {
      clearInterval(this.timers[timerId])
    })
  }

  createTodoItem(description, minutes, seconds) {
    return {
      id: this.maxId++,
      description: description,
      created: new Date(),
      completed: false,
      duration: parseInt(minutes) * 60 + parseInt(seconds),
    }
  }

  onDeleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  onDeletedCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => !el.completed),
    }))
  }

  onItemAdded = (description, minutes, seconds) => {
    const newItem = this.createTodoItem(description, minutes, seconds)
    this.setState(({ todoData, timerTimes }) => {
      const newTimerTimes = {
        ...timerTimes,
        [newItem.id]: {
          time: newItem.duration,
          running: false,
          finished: false,
        },
      }
      return {
        todoData: [...todoData, newItem],
        timerTimes: newTimerTimes,
      }
    })
  }

  onToggleCompleted = (id) => {
    this.setState(
      (prevState) => {
        const idx = prevState.todoData.findIndex((el) => el.id === id)
        const oldItem = prevState.todoData[idx]
        const newItem = { ...oldItem, completed: !oldItem.completed }
        const newArray = [...prevState.todoData.slice(0, idx), newItem, ...prevState.todoData.slice(idx + 1)]

        return { todoData: newArray }
      },
      () => {
        const item = this.state.todoData.find((el) => el.id === id)
        if (item.completed) {
          this.stopTimer(id)
        }
      }
    )
  }

  onSaveEdit = (id, newText) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, description: newText }
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  filterTasks = (todoData, filter) => {
    switch (filter) {
      case 'all':
        return todoData
      case 'active':
        return todoData.filter((el) => !el.completed)
      case 'completed':
        return todoData.filter((el) => el.completed)
      default:
        return todoData
    }
  }

  render() {
    const { todoData, filter, timerTimes } = this.state
    const completedCount = this.state.todoData.filter((el) => el.completed).length
    const todoCount = this.state.todoData.length - completedCount
    const visibleItems = this.filterTasks(todoData, filter)
    return (
      <section className="todoapp">
        <NewTaskList onItemAdded={this.onItemAdded} />
        <TaskList
          tasks={visibleItems}
          startTimer={this.startTimer}
          pauseTimer={this.pauseTimer}
          timerTimes={timerTimes}
          onDeleted={this.onDeleteItem}
          onToggleCompleted={this.onToggleCompleted}
          onSaveEdit={this.onSaveEdit}
        />
        <Footer
          todoCount={todoCount}
          filter={filter}
          onFilterChange={this.onFilterChange}
          onDeletedCompleted={this.onDeletedCompleted}
        />
      </section>
    )
  }
}
