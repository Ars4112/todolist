import React, { ChangeEvent, DragEventHandler, useCallback, useEffect, useRef, useState } from "react"
import { Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { EditableSpan } from "common/components"
import { TaskStatuses } from "common/enums"
import { TaskType } from "../../todolistsApi"
import { useAppDispatch } from "common/hooks"
import { selectTasks, tasksAction } from "features/todolistsList/tasksSlice"
import { useSelector } from "react-redux"

type TaskPropsType = {
  task: TaskType
  todolistId: string
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  removeTask: (taskId: string, todolistId: string) => void
  setActiveDraggableTaskElement: (taskId: string | null) => void
  activeDraggableTaskElement: string | null
  setCurrentTodolistId: (todolistId: string | null) => void
  currenTodolistId: string | null
}

export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useAppDispatch()

  const tasks = useSelector(selectTasks)

  const onClickHandler = useCallback(
    () => props.removeTask(props.task.id, props.todolistId),
    [props.task.id, props.todolistId],
  )

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      props.changeTaskStatus(
        props.task.id,
        newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
        props.todolistId,
      )
    },
    [props.task.id, props.todolistId],
  )

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    },
    [props.task.id, props.todolistId],
  )

  const handleDragStart: DragEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()

    props.setActiveDraggableTaskElement(props.task.id)
    props.setCurrentTodolistId(props.todolistId)
  }

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()

    const activeElement = props.activeDraggableTaskElement
    const targetElement = e.currentTarget.id

    if (targetElement === activeElement) return

    if (props.currenTodolistId === props.todolistId) {
      if (activeElement && targetElement) {
        const activeElementIndex = tasks[props.todolistId].findIndex((i) => i.id === activeElement)
        const targetElementIndex = tasks[props.todolistId].findIndex((i) => i.id === targetElement)

        if (activeElementIndex > -1 && targetElementIndex > -1) {
          const tasksArray = [...tasks[props.todolistId]]
          tasksArray.splice(targetElementIndex, 0, tasksArray.splice(activeElementIndex, 1)[0])

          dispatch(tasksAction.changeOrderTasks({ tasks: tasksArray, todolistId: props.todolistId }))
        }
      }
    }
  }

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    if (props.currenTodolistId === props.todolistId) return

    const targetElement = e.currentTarget.id
    const activeElement = props.activeDraggableTaskElement

    if (activeElement && targetElement) {
      if (props.currenTodolistId) {
        const activeElementIndex = tasks[props.currenTodolistId].findIndex((i) => i.id === activeElement)
        const targetElementIndex = tasks[props.todolistId].findIndex((i) => i.id === targetElement)

        if (activeElementIndex > -1 && targetElementIndex > -1) {
          const startTasksArray = [...tasks[props.currenTodolistId]]
          const targetTasksArray = [...tasks[props.todolistId]]

          targetTasksArray.splice(targetElementIndex, 0, startTasksArray.splice(activeElementIndex, 1)[0])

          dispatch(
            tasksAction.transferingTask({
              startTasks: startTasksArray,
              targetTasks: targetTasksArray,
              todolistId: props.todolistId,
              currentTodolistId: props.currenTodolistId,
            }),
          )
        }
      }
    }
  }

  return (
    <div
      id={props.task.id}
      title={props.task.title}
      className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}
      draggable={true}
      onDragEnter={handleDragEnter}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
    >
      <Checkbox checked={props.task.status === TaskStatuses.Completed} color="primary" onChange={onChangeHandler} />

      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  )
})
