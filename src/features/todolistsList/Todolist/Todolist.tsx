import { Delete } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"
import { AddItemForm, EditableSpan } from "common/components"
import { TaskStatuses } from "common/enums"
import { useAppDispatch } from "common/hooks"
import React, { DragEventHandler, useCallback, useEffect } from "react"
import { selectTasks, tasksAction,tasksThunks } from "../tasksSlice"
import { FilterValuesType, TodolistDomainType} from "../todolistsSlice"
import { Task } from "./Task/Task"
import { useSelector } from "react-redux"

type PropsType = {
  todolist: TodolistDomainType

  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  removeTask: (taskId: string, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  setActiveDraggableTaskElement: (taskId: string | null) => void
  activeDraggableTaskElement: string | null
  setCurrentTodolistId: (todolistId: string | null) => void
  currenTodolistId: string | null
}

export const Todolist = React.memo(function (props: PropsType) {
  const dispatch = useAppDispatch()

  const tasks = useSelector(selectTasks)

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(props.todolist.id))
  }, [])

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todolist.id)
    },
    [props.addTask, props.todolist.id],
  )

  const removeTodolist = () => {
    props.removeTodolist(props.todolist.id)
  }

  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.todolist.id, title)
    },
    [props.todolist.id, props.changeTodolistTitle],
  )

  const onAllClickHandler = useCallback(
    () => props.changeFilter("all", props.todolist.id),
    [props.todolist.id, props.changeFilter],
  )
  const onActiveClickHandler = useCallback(
    () => props.changeFilter("active", props.todolist.id),
    [props.todolist.id, props.changeFilter],
  )
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.todolist.id),
    [props.todolist.id, props.changeFilter],
  )

  let tasksForTodolist = tasks[props.todolist.id]

  if (props.todolist.filter === "active") {
    tasksForTodolist = tasks[props.todolist.id].filter((t) => t.status === TaskStatuses.New)
  }
  if (props.todolist.filter === "completed") {
    tasksForTodolist = tasks[props.todolist.id].filter((t) => t.status === TaskStatuses.Completed)
  }

  const handlerDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    if (tasksForTodolist.length !== 0) return
    if (props.currenTodolistId === e.currentTarget.id) return

    const activeElement = props.activeDraggableTaskElement

    if (activeElement) {
      if (props.currenTodolistId) {
        const activeElementIndex = tasks[props.currenTodolistId].findIndex((i) => i.id === activeElement)

        if (activeElementIndex > -1) {
          const startTasksArray = [...tasks[props.currenTodolistId]]
          const targetTasksArray = [...tasks[props.todolist.id]]

          targetTasksArray.push(startTasksArray.splice(activeElementIndex, 1)[0])

          dispatch(
            tasksAction.transferingTask({
              startTasks: startTasksArray,
              targetTasks: targetTasksArray,
              todolistId: props.todolist.id,
              currentTodolistId: props.currenTodolistId,
            }),
          )
        }
      }
    }
    props.setCurrentTodolistId(null)
  }

  const handlerDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (tasksForTodolist.length !== 0) return
  }

  return (
    <div>
      <h3>
        <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"} />
      <div
        id={props.todolist.id}
        
        onDrop={handlerDrop}
        onDragEnter={handlerDragEnter}
      >
        {tasksForTodolist.length !== 0 ? (
          tasksForTodolist.map((t) => (
            <Task
              key={t.id}
              task={t}
              todolistId={props.todolist.id}
              removeTask={props.removeTask}
              changeTaskTitle={props.changeTaskTitle}
              changeTaskStatus={props.changeTaskStatus}
              setActiveDraggableTaskElement={props.setActiveDraggableTaskElement}
              activeDraggableTaskElement={props.activeDraggableTaskElement}
              setCurrentTodolistId={props.setCurrentTodolistId}
              currenTodolistId={props.currenTodolistId}
            />
          ))
        ) : (
          <h3>"hjdhdjshdjsd"</h3>
        )}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <Button
          variant={props.todolist.filter === "all" ? "outlined" : "text"}
          onClick={onAllClickHandler}
          color={"inherit"}
        >
          All
        </Button>
        <Button
          variant={props.todolist.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={props.todolist.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  )
})
