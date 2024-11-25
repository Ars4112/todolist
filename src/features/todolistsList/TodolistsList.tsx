import { Grid, Paper } from "@mui/material"
import { AddItemForm } from "common/components"
import { TaskStatuses } from "common/enums"
import { useAppDispatch } from "common/hooks"
import React, { DragEventHandler, useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectIsLoggedIn } from "../auth/model/authSlice"
import { tasksThunks } from "./tasksSlice"
import { Todolist } from "./Todolist/Todolist"
import { FilterValuesType, selectTodolists, todolistsActions, todolistsThunks } from "./todolistsSlice"

export const TodolistsList = () => {
  let todolists = useSelector(selectTodolists)

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  const [activeDraggableTaskElement, setActiveDraggableTaskElement] = useState<string | null>(null)

  const [currenTodolistId, setCurrentTodolistId] = useState<string | null>(null)

  const activeDraggableElement = useRef<string | null>(null)
  const targetDraggableElement = useRef<string | null>(null)
  const activeElementIndex = useRef<number | null>(null)
  const targetElementIndex = useRef<number | null>(null)
  const audio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }

    dispatch(todolistsThunks.fetchTodolists())
  }, [])

  const removeTask = useCallback(function (taskId: string, todolistId: string) {
    dispatch(tasksThunks.removeTask({ taskId, todolistId }))
  }, [])

  const addTask = useCallback(function (title: string, todolistId: string) {
    dispatch(tasksThunks.addTask({ title, todolistId }))
  }, [])

  const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
    dispatch(tasksThunks.updateTask({ taskId, domainModel: { status }, todolistId }))
  }, [])

  const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
    dispatch(tasksThunks.updateTask({ taskId, domainModel: { title }, todolistId }))
  }, [])

  const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
    dispatch(todolistsActions.changeTodolistFilter({ id, filter }))
  }, [])

  const removeTodolist = useCallback(function (id: string) {
    dispatch(todolistsThunks.removeTodolist(id))
  }, [])

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    dispatch(todolistsThunks.changeTodolistTitle({ id, title }))
  }, [])

  const addTodolist = useCallback((title: string) => {
    dispatch(todolistsThunks.addTodolist(title))
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  const dragOverHendler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
  }

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    activeDraggableElement.current = null
    targetDraggableElement.current = null
    if (audio.current) audio.current.play()
  }

  const handleDragStart: DragEventHandler<HTMLDivElement> = (e) => {
    activeDraggableElement.current = e.currentTarget.id
  }

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    targetDraggableElement.current = e.currentTarget.id
    const activeElement = activeDraggableElement.current
    const targetElement = targetDraggableElement.current
    if (activeElement === targetElement) return

    if (activeDraggableElement.current && targetDraggableElement.current) {
      targetElementIndex.current = todolists.findIndex((i) => i.id === targetDraggableElement.current)
      activeElementIndex.current = todolists.findIndex((i) => i.id === activeDraggableElement.current)
      const todolistsCopy = [...todolists]

      if (activeElementIndex.current > -1 && targetElementIndex.current > -1) {
        todolistsCopy.splice(targetElementIndex.current, 0, todolistsCopy.splice(activeElementIndex.current, 1)[0])

        dispatch(todolistsActions.changeOrderTodolists({ todolist: todolistsCopy }))
      }
    }
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3} onDragOver={dragOverHendler} onDrop={handleDrop}>
        {todolists.map((tl) => {
          return (
            <Grid item key={tl.id}>
              <Paper
                id={tl.id}
                style={{ padding: "10px" }}
                draggable={true}
                onDragStart={handleDragStart}
                onDragEnter={handleDragEnter}
              >
                <Todolist
                  todolist={tl}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  setActiveDraggableTaskElement={setActiveDraggableTaskElement}
                  activeDraggableTaskElement={activeDraggableTaskElement}
                  setCurrentTodolistId={setCurrentTodolistId}
                  currenTodolistId={currenTodolistId}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
