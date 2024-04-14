import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './new-task-list.css'

const NewTaskList = ({ onItemAdded }) => {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinutesChange = (e) => {
    setMinutes(e.target.value)
  }

  const onSecondsChange = (e) => {
    setSeconds(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (label.trim()) {
      onItemAdded(label, minutes, seconds)
      setLabel('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <input className="new-todo" placeholder="Task" value={label} onChange={onLabelChange} autoFocus />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={minutes}
          onChange={onMinutesChange}
          type="number"
          min="0"
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={seconds}
          onChange={onSecondsChange}
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

NewTaskList.propTypes = {
  onItemAdded: PropTypes.func,
}

export default NewTaskList
