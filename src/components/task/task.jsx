import React, { useState } from 'react'
import { formatDistance } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'

const Task = ({
  id,
  description = 'No description',
  created = new Date(),
  completed = false,
  onDeleted,
  onToggleCompleted,
  onSaveEdit,
  startTimer,
  pauseTimer,
  timerState,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(description)

  const handleStartClick = () => {
    startTimer(id)
  }

  const handlePauseClick = () => {
    pauseTimer(id)
  }

  const onEdit = () => {
    setIsEditing(true)
  }

  const onChangeEdit = (e) => {
    setEditText(e.target.value)
  }

  const onSave = () => {
    onSaveEdit(id, editText)
    setIsEditing(false)
  }

  const onCancelEdit = () => {
    setEditText(description)
    setIsEditing(false)
  }

  const timeAgo = formatDistance(new Date(created), new Date(), { addSuffix: true })

  const minutes = Math.floor(isNaN(timerState.time) ? 0 : timerState.time / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (isNaN(timerState.time) ? 0 : timerState.time % 60).toString().padStart(2, '0')

  const classNames = `${completed ? ' completed' : ''}${isEditing ? ' editing' : ''}`

  return (
    <li className={classNames}>
      {isEditing ? (
        <input
          className="edit"
          value={editText}
          onChange={onChangeEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSave()
            } else if (e.key === 'Escape') {
              onCancelEdit()
            }
          }}
          autoFocus
        />
      ) : (
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={() => onToggleCompleted(id)} />
          <label onDoubleClick={onEdit}>
            <span className="title">{description}</span>
            <span className="description">
              <button className="icon icon-play" onClick={handleStartClick}></button>
              <button className="icon icon-pause" onClick={handlePauseClick}></button>
              <span className="description-time">{timerState.finished ? 'Закончено' : `${minutes}:${seconds}`}</span>
            </span>
            <span className="description">created {timeAgo}</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={() => onDeleted(id)}></button>
        </div>
      )}
    </li>
  )
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string,
  created: PropTypes.instanceOf(Date),
  completed: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onSaveEdit: PropTypes.func,
  startTimer: PropTypes.func,
  pauseTimer: PropTypes.func,
  timerTimes: PropTypes.objectOf(
    PropTypes.shape({
      time: PropTypes.number.isRequired,
      running: PropTypes.bool.isRequired,
      finished: PropTypes.bool.isRequired,
    })
  ),
}

export default Task
