import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'

import './footer.css'

export default class Footer extends Component {
  static defaultProps = {
    todoCount: 0,
    filter: 'all',
  }

  static propTypes = {
    todoCount: PropTypes.number,
    filter: PropTypes.oneOf(['all', 'active', 'completed']),
    onFilterChange: PropTypes.func,
    onDeletedCompleted: PropTypes.func,
  }
  render() {
    const { todoCount, filter, onFilterChange, onDeletedCompleted } = this.props

    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={onDeletedCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}
