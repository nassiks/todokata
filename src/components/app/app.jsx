import React, { useState, useEffect, useRef } from 'react'

import NewTaskList from '../new-task-list'
import TaskList from '../task-list'
import Footer from '../footer'
import './app.css'

function App() {
  const [todoData, setTodoData] = useState(() => {
    const savedTodos = localStorage.getItem('todoData')
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos)
      return parsedTodos.map((todo) => ({
        ...todo,
        created: new Date(todo.created),
      }))
    }
    return []
  })
  const [filter, setFilter] = useState('all')
  const [timerTimes, setTimerTimes] = useState(() => {
    const savedTimers = localStorage.getItem('timerTimes')
    return savedTimers ? JSON.parse(savedTimers) : {}
  })
  const maxIdRef = useRef(todoData.reduce((maxId, item) => Math.max(item.id, maxId), 0))
  const timersRef = useRef({})

  const timerTimesRef = useRef(timerTimes)

  useEffect(() => {
    timerTimesRef.current = timerTimes
  }, [timerTimes])

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoData))
  }, [todoData])

  useEffect(() => {
    localStorage.setItem('timerTimes', JSON.stringify(timerTimes))
  }, [timerTimes])

  const startTimer = (id) => {
    if (!timerTimes[id].running && timerTimes[id].time > 0) {
      updateTimer(id, { running: true })
      timersRef.current[id] = setInterval(() => {
        const currentTime = timerTimesRef.current[id].time
        if (currentTime > 0) {
          updateTimer(id, { time: currentTime - 1 })
        } else {
          stopTimer(id)
        }
      }, 1000)
    }
  }

  const updateTimer = (id, update) => {
    setTimerTimes((prevTimerTimes) => ({
      ...prevTimerTimes,
      [id]: { ...prevTimerTimes[id], ...update },
    }))
  }

  const pauseTimer = (id) => {
    clearInterval(timersRef.current[id])
    updateTimer(id, { running: false })
  }

  const stopTimer = (id) => {
    clearInterval(timersRef.current[id])
    const { running, finished, time } = timerTimes[id]
    if (running || !finished || time !== 0) {
      updateTimer(id, { running: false, finished: true, time: 0 })
    }
  }

  const createTodoItem = (description, minutes, seconds) => {
    const newItemId = maxIdRef.current + 1
    maxIdRef.current = newItemId
    return {
      id: newItemId,
      description: description,
      created: new Date(),
      completed: false,
      duration: parseInt(minutes) * 60 + parseInt(seconds),
    }
  }

  const onDeleteItem = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id)
      return [...prevTodoData.slice(0, idx), ...prevTodoData.slice(idx + 1)]
    })
  }

  const onDeletedCompleted = () => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => !el.completed))
  }

  const onItemAdded = (description, minutes, seconds) => {
    const newItem = createTodoItem(description, minutes, seconds)
    setTodoData((prevTodoData) => [...prevTodoData, newItem])
    setTimerTimes((prevTimerTimes) => ({
      ...prevTimerTimes,
      [newItem.id]: { time: newItem.duration, running: false, finished: false },
    }))
    console.log(newItem.duration)
  }

  const onToggleCompleted = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id)
      const oldItem = prevTodoData[idx]
      const newItem = { ...oldItem, completed: !oldItem.completed }
      return [...prevTodoData.slice(0, idx), newItem, ...prevTodoData.slice(idx + 1)]
    })
  }

  useEffect(() => {
    todoData.forEach((task) => {
      if (task.completed) {
        stopTimer(task.id)
      }
    })
  }, [todoData])

  const onSaveEdit = (id, newText) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id)
      const oldItem = prevTodoData[idx]
      const newItem = { ...oldItem, description: newText }
      return [...prevTodoData.slice(0, idx), newItem, ...prevTodoData.slice(idx + 1)]
    })
  }

  const onFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const filterTasks = (todoData, filter) => {
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

  const completedCount = todoData.filter((el) => el.completed).length
  const todoCount = todoData.length - completedCount
  const visibleItems = filterTasks(todoData, filter)

  return (
    <section className="todoapp">
      <NewTaskList onItemAdded={onItemAdded} />
      <TaskList
        tasks={visibleItems}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        timerTimes={timerTimes}
        onDeleted={onDeleteItem}
        onToggleCompleted={onToggleCompleted}
        onSaveEdit={onSaveEdit}
      />
      <Footer
        todoCount={todoCount}
        filter={filter}
        onFilterChange={onFilterChange}
        onDeletedCompleted={onDeletedCompleted}
      />
    </section>
  )
}

export default App
