import React, { Component } from 'react'
import { formatDistance } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'

export default class Task extends Component {
  static defaultProps = {
    description: 'No description',
    created: new Date(),
    completed: false,
  }

  static propTypes = {
    description: PropTypes.string,
    created: PropTypes.instanceOf(Date),
    completed: PropTypes.bool,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onEditItem: PropTypes.func,
    timerTimes: PropTypes.objectOf(
      PropTypes.shape({
        time: PropTypes.number.isRequired,
        running: PropTypes.bool.isRequired,
        finished: PropTypes.bool.isRequired,
      })
    ),
  }

  state = {
    isEditing: false,
    editText: this.props.description,
  }

  handleStartClick = () => {
    this.props.startTimer(this.props.id)
  }

  handlePauseClick = () => {
    this.props.pauseTimer(this.props.id)
  }

  onEdit = () => {
    this.setState({ isEditing: true })
  }

  onChangeEdit = (e) => {
    this.setState({ editText: e.target.value })
  }

  onSaveEdit = (id) => {
    this.props.onSaveEdit(id, this.state.editText)
    this.setState({ isEditing: false })
  }

  onCancelEdit = () => {
    this.setState({
      isEditing: false,
      editText: this.props.description,
    })
  }

  render() {
    const { description, created, completed, onDeleted, onToggleCompleted, timerState } = this.props
    const { isEditing, editText } = this.state

    const timeAgo = formatDistance(new Date(created), new Date(), { addSuffix: true })

    let minutes = Math.floor(isNaN(timerState.time) ? 0 : timerState.time / 60)
      .toString()
      .padStart(2, '0')
    let seconds = (isNaN(timerState.time) ? 0 : timerState.time % 60).toString().padStart(2, '0')

    let classNames = (completed ? ' completed' : '') + (isEditing ? ' editing' : '')

    return (
      <li className={classNames}>
        {isEditing ? (
          <input
            className="edit"
            value={editText}
            onChange={this.onChangeEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                this.onSaveEdit(this.props.id)
              } else if (e.key === 'Escape') {
                this.onCancelEdit()
              }
            }}
            autoFocus
          />
        ) : (
          <div className="view">
            <input className="toggle" type="checkbox" checked={completed} onChange={onToggleCompleted} />
            <label onDoubleClick={this.onEdit}>
              <span className="title">{description}</span>
              <span className="description">
                <button className="icon icon-play" onClick={this.handleStartClick}></button>
                <button className="icon icon-pause" onClick={this.handlePauseClick}></button>
                <span className="description-time">{timerState.finished ? 'Закончено' : `${minutes}:${seconds}`}</span>
              </span>
              <span className="description">created {timeAgo}</span>
            </label>
            <button className="icon icon-edit" onClick={this.onEdit}></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
          </div>
        )}
      </li>
    )
  }
}
