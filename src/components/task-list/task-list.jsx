import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

export default class TaskList extends Component {
  static defaultProps = {
    tasks: [],
  }

  static propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        created: PropTypes.instanceOf(Date).isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ).isRequired,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onSaveEdit: PropTypes.func,
    startTimer: PropTypes.func,
    pauseTimer: PropTypes.func,
    timerTimes: PropTypes.objectOf(
      PropTypes.shape({
        time: PropTypes.number || null,
        running: PropTypes.bool.isRequired,
        finished: PropTypes.bool.isRequired,
        duration: PropTypes.number,
      })
    ),
  }

  render() {
    const { tasks, onDeleted, onToggleCompleted, onSaveEdit, timerTimes, startTimer, pauseTimer } = this.props
    return (
      <section className="main">
        <ul className="todo-list">
          {tasks.map((task) => (
            <Task
              key={task.id}
              {...task}
              startTimer={startTimer}
              pauseTimer={pauseTimer}
              timerState={timerTimes[task.id]}
              onDeleted={() => onDeleted(task.id)}
              onSaveEdit={onSaveEdit}
              onToggleCompleted={() => onToggleCompleted(task.id)}
            />
          ))}
        </ul>
      </section>
    )
  }
}
