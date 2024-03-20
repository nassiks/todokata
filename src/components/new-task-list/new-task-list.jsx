import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-list.css'

export default class NewTaskList extends Component {
  static propTypes = {
    onItemAdded: PropTypes.func,
  }

  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label } = this.state

    if (label.trim().length > 0) {
      this.props.onItemAdded(label)
      this.setState({
        label: '',
      })
    } else {
      console.log('Введена пустая строка')
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={this.state.label}
            autoFocus
          />
        </form>
      </header>
    )
  }
}
