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
  }

  state = {
    isEditing: false,
    editText: this.props.description,
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
    const { description, created, completed, onDeleted, onToggleCompleted } = this.props
    const { isEditing, editText } = this.state
    const timeAgo = formatDistance(new Date(created), new Date(), { addSuffix: true })

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
              <span className="description">{description}</span>
              <span className="created">created {timeAgo}</span>
            </label>
            <button className="icon icon-edit" onClick={this.onEdit}></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
          </div>
        )}
      </li>
    )
  }
}
