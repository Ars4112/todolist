import React, { memo, useCallback, useEffect, useMemo } from "react";

import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { ButtonMemo } from "./ButtonMemo";
import { TaskWithRedux } from "./TaskWithRedux";
import { useAppDispatch } from "./state/store";
import { fetchTasksTC } from "./state/tasks-reducer";
import { TaskStatuses, TaskType } from "./api/todolist-api";
import {
	FilterValuesType,
	changeTodolistsTitleTC,
} from "./state/todolists-reducer";
import { RequestStatusType } from "./state/app-reducer";
import CircularProgress from "@mui/material/CircularProgress";

type PropsType = {
	id: string;
	title: string;
	tasks: Array<TaskType>;
	entityStatus: RequestStatusType;
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
	taskEntityStatus: boolean;
};

export const Todolist = memo((props: PropsType) => {
	const dispatch = useAppDispatch();
	let tasks = props.tasks;
	tasks = useMemo(() => {
		if (props.filter === "active") {
			tasks = props.tasks.filter((t) => t.status === TaskStatuses.New);
		}
		if (props.filter === "completed") {
			tasks = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
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
			dispatch(changeTodolistsTitleTC(props.id, title));
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

	return (
		<div>
			<h3>
				{" "}
				<EditableSpan
					value={props.title}
					onChange={changeTodolistTitle}
					entityStatus={props.entityStatus}
				/>
				<IconButton
					onClick={removeTodolist}
					disabled={props.entityStatus === "loading"}
				>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTask} entityStatus={props.entityStatus} />
			{!props.taskEntityStatus ? (
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
								entityStatus={props.entityStatus}
								editMode={t.editMode}
							/>
						);
					})}
				</div>
			) : (
				<div style={{ display: "flex", justifyContent: "center" }}>
					<CircularProgress size={24} />
				</div>
			)}
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
