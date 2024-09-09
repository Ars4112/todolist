import "./App.css";
import { Todolist } from "./Todolist";
import { AddItemForm } from "./AddItemForm";
import {
	Grid,
	Paper,
	Skeleton,
} from "@mui/material";
import {
	FilterValuesType,
	TodolistType,
	addTodolistsTC,
	changeTodolistFilterAC,
	changeTodolistsTitleTC,
	fetchTodolistsTC,
	removeTodolistsTC,
} from "./state/todolists-reducer";
import {
	TasksStateType,
	addTaskTC,
	changeTaskTitleTC,
	removeTaskTC,
} from "./state/tasks-reducer";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "./state/store";
import { useCallback, useEffect } from "react";
import { RequestStatusType } from "./state/app-reducer";
import { Navigate } from "react-router-dom";


export function TodolistContainer() {
	const todolists = useSelector<AppRootStateType, Array<TodolistType>>(
		(state) => state.todolists
	);

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
	const tasks = useSelector<AppRootStateType, TasksStateType>(
		(state) => state.tasks
	);

	const status = useSelector<AppRootStateType, RequestStatusType>(
		(state) => state.app.status
	);

	const dispatch = useAppDispatch();

	const removeTask = useCallback(
		(id: string, todolistId: string) => {
			dispatch(removeTaskTC(todolistId, id));
		},
		[dispatch]
	);

	const addTask = useCallback(
		(title: string, todolistId: string) => {
			dispatch(addTaskTC(title, todolistId));
		},
		[dispatch]
	);

	// const changeStatus = useCallback(
	// 	(id: string, isDone: boolean, todolistId: string) => {
	// 		dispatch(changeTaskStatusAC(id, isDone, todolistId));
	// 	},
	// 	[dispatch]
	// );

	const changeTaskTitle = useCallback(
		(id: string, newTitle: string, todolistId: string) => {
			dispatch(changeTaskTitleTC(id, newTitle, todolistId));
		},
		[dispatch]
	);

	const changeFilter = useCallback(
		(value: FilterValuesType, todolistId: string) => {
			dispatch(changeTodolistFilterAC(todolistId, value));
		},
		[dispatch]
	);

	const removeTodolist = useCallback(
		(id: string) => {
			dispatch(removeTodolistsTC(id));
		},
		[dispatch]
	);

	const changeTodolistTitle = useCallback(
		(id: string, title: string) => {
			dispatch(changeTodolistsTitleTC(id, title));
		},
		[dispatch]
	);

	const addTodolist = useCallback(
		(title: string) => {
			dispatch(addTodolistsTC(title));
		},
		[dispatch]
	);

	useEffect(() => {
        if (!isLoggedIn) return
		dispatch(fetchTodolistsTC());
	}, []);

   

	if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

	return (
		<>
			<Grid container style={{ padding: "20px" }}>
				<AddItemForm addItem={addTodolist} status={status} />
			</Grid>
			<Grid container spacing={3}>
				{(status === "loading" || todolists.length === 0
					? Array.from(new Array(6))
					: todolists
				).map((tl, index) => {
					return (
						<Grid key={tl ? tl.id : index} item>
							{tl ? (
								<Paper style={{ padding: "10px" }}>
									<Todolist
										// key={tl.id}
										id={tl.id}
										title={tl.title}
										tasks={tasks[tl.id]}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										// changeTaskStatus={changeStatus}
										filter={tl.filter}
										entityStatus={tl.entityStatus}
										taskEntityStatus={tl.taskEntityStatus}
										removeTodolist={removeTodolist}
										changeTaskTitle={changeTaskTitle}
										changeTodolistTitle={changeTodolistTitle}
									/>
								</Paper>
							) : (
								<Skeleton variant="rounded" width={260} height={190} />
							)}
						</Grid>
					);
				})}
			</Grid>
		</>
	);
}
