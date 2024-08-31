import React, { memo, useCallback, useEffect, useMemo } from "react";
// import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Task } from "./Task";
import { ButtonMemo } from "./ButtonMemo";
import { TaskWithRedux } from "./TaskWithRedux";
import { useAppDispatch } from "./state/store";
import { fetchTasksTC } from "./state/tasks-reducer";
import { TaskStatuses, TaskType } from "./api/todolist-api";
import { FilterValuesType, changeTodolistsTitleTC } from "./state/todolists-reducer";

type PropsType = {
	id: string;
	title: string;
	tasks: Array<TaskType>;
	removeTask: (taskId: string, todolistId: string) => void;
	changeFilter: (value: FilterValuesType, todolistId: string) => void;
	addTask: (title: string, todolistId: string) => void;
	// changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
	removeTodolist: (id: string) => void;
	changeTodolistTitle: (id: string, newTitle: string) => void;
	filter?: FilterValuesType;
	changeTaskTitle: (
		taskId: string,
		newTitle: string,
		todolistId: string
	) => void;
};

export const Todolist = memo((props: PropsType) => {
	const dispatch = useAppDispatch();
	let tasks = props.tasks;
	tasks = useMemo(() => {
		let tasksForTodolist = props.tasks;
		if (props.filter === "active") {
			tasksForTodolist = props.tasks.filter(
				(t) => t.status === TaskStatuses.New
			);
		}
		if (props.filter === "completed") {
			tasksForTodolist = props.tasks.filter(
				(t) => t.status === TaskStatuses.Completed
			);
		}
		return tasks;
	}, [tasks, props.filter]);

	const addTask = useCallback(
		(title: string) => {
			props.addTask(title, props.id);
		},
		[props.addTask, props.id]
	);

	const removeTodolist = useCallback(() => {
		props.removeTodolist(props.id);
	}, [props.removeTodolist, props.id]);

	const changeTodolistTitle = useCallback(
		(title: string) => {
			dispatch(changeTodolistsTitleTC(props.id, title))
			// props.changeTodolistTitle(props.id, title);
		},
		[props.changeTodolistTitle, props.id]
	);

	const onAllClickHandler = useCallback(
		() => props.changeFilter("all", props.id),
		[props.changeFilter, props.id]
	);

	const onActiveClickHandler = useCallback(
		() => props.changeFilter("active", props.id),
		[props.changeFilter, props.id]
	);

	const onCompletedClickHandler = useCallback(
		() => props.changeFilter("completed", props.id),
		[props.changeFilter, props.id]
	);

	useEffect(() => {
		dispatch(fetchTasksTC(props.id));
	}, []);

	// console.log(tasks);

	return (
		<div>
			<h3>
				{" "}
				<EditableSpan value={props.title} onChange={changeTodolistTitle} />
				<IconButton onClick={removeTodolist}>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTask} />
			<div>
				{tasks?.map((t) => {
					return (
						<TaskWithRedux
							key={t.id}
							taskId={t.id}
							title={t.title}
							isDone={t.status}
							todolistId={props.id}
							removeTask={props.removeTask}
						/>
					);
				})}
			</div>
			<div>
				<ButtonMemo
					variant={props.filter === "all" ? "outlined" : "text"}
					onClick={onAllClickHandler}
					color={"inherit"}
					title={"All"}
				/>
				<ButtonMemo
					variant={props.filter === "active" ? "outlined" : "text"}
					onClick={onActiveClickHandler}
					color={"primary"}
					title={"Active"}
				/>
				<ButtonMemo
					variant={props.filter === "completed" ? "outlined" : "text"}
					onClick={onCompletedClickHandler}
					color={"secondary"}
					title={"Completed"}
				/>
			</div>
		</div>
	);
});
