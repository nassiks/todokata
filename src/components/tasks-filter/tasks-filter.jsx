import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.css'

export default class TasksFilter extends Component {
  static defaultProps = {
    filter: 'all',
  }

  static propTypes = {
    filter: PropTypes.oneOf(['all', 'active', 'completed']),
    onFilterChange: PropTypes.func,
  }

  render() {
    const { filter, onFilterChange } = this.props

    const buttons = [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'completed', label: 'Completed' },
    ]

    return (
      <ul className="filters">
        {buttons.map(({ name, label }) => (
          <li key={name}>
            <button className={filter === name ? 'selected' : ''} onClick={() => onFilterChange(name)}>
              {label}
            </button>
          </li>
        ))}
      </ul>
    )
  }
}
