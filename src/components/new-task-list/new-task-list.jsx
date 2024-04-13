import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-list.css'

export default class NewTaskList extends Component {
  static propTypes = {
    onItemAdded: PropTypes.func,
  }

  state = {
    label: '',
    minutes: '',
    seconds: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinutesChange = (e) => {
    this.setState({ minutes: e.target.value })
  }

  onSecondsChange = (e) => {
    this.setState({ seconds: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label, minutes, seconds } = this.state

    if (label.trim().length > 0) {
      this.props.onItemAdded(label, minutes, seconds)
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      })
    } else {
      return {}
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input
            className="new-todo"
            placeholder="Task"
            onChange={this.onLabelChange}
            value={this.state.label}
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            value={this.state.minutes}
            onChange={this.onMinutesChange}
            type="number"
            min="0"
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            value={this.state.seconds}
            onChange={this.onSecondsChange}
            type="number"
            min="0"
            max="59"
            autoFocus
          />
          <button type="submit" className="button-hidden"></button>
        </form>
      </header>
    )
  }
}
