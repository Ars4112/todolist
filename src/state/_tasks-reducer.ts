// import {
// 	// AddTodolistActionType,
// 	// ChangeTodolistEntityStatus,
// 	// RemoveTodolistActionType,
// 	// SetTodolistType,
// 	changeTaskEntityStatus,
// 	changeTodolistEntityStatus,
// } from "./todolists-reducer";
// import { TaskStatuses, TaskType, todolistAPI } from "../api/todolist-api";
// import { Dispatch } from "redux";
// import { AppRootStateType } from "./store";
// import { setAppError } from "./app-reducer";

// export type TasksStateType = {
// 	[key: string]: TaskType[];
// };

// export type RemoveTaskActionType = {
// 	type: "REMOVE-TASK";
// 	todolistId: string;
// 	taskId: string;
// };
// export type AddTaskActionType = {
// 	type: "ADD-TASK";
// 	task: TaskType;
// };
// export type ChangeTaskStatusActionType = {
// 	type: "CHANGE-TASK-STATUS";
// 	taskId: string;
// 	todolistId: string;
// 	isDone: TaskStatuses;
// };
// export type ChangeTaskTitleActionType = {
// 	type: "CHANGE-TASK-TITLE";
// 	taskId: string;
// 	todolistId: string;
// 	title: string;
// };

// export type setTasksType = ReturnType<typeof setTasksAC>;
// export type ChangeEditModeType = ReturnType<typeof changeEditModeAC>;

// type ActionsType =
// 	| RemoveTaskActionType
// 	| AddTaskActionType
// 	| ChangeTaskStatusActionType
// 	| ChangeTaskTitleActionType
// 	// | AddTodolistActionType
// 	// | RemoveTodolistActionType
// 	// | SetTodolistType
// 	| setTasksType
// 	// | ChangeTodolistEntityStatus
// 	| ChangeEditModeType;

// const initialState: TasksStateType = {};

// export const tasksReducer = (
// 	state: TasksStateType = initialState,
// 	action: ActionsType
// ): TasksStateType => {
// 	switch (action.type) {
// 		// case "SET-TASKS": {
// 		// 	return {
// 		// 		...state,
// 		// 		[action.todolistId]: action.tasks.map((i) => ({
// 		// 			...i,
// 		// 			editMode: false,
// 		// 		})),
// 		// 	};
// 		// }

// 		// case "SET-TODOLISTS": {
// 		// 	const newState = { ...state };
// 		// 	action.todos.forEach((i) => {
// 		// 		newState[i.id] = [];
// 		// 	});
// 		// 	return newState;
// 		// }
// 		// case "REMOVE-TASK": {
// 		// 	const stateCopy = { ...state };
// 		// 	const tasks = state[action.todolistId];
// 		// 	const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
// 		// 	stateCopy[action.todolistId] = filteredTasks;
// 		// 	return stateCopy;
// 		// }
// 		// case "ADD-TASK": {
// 		// 	return {
// 		// 		...state,
// 		// 		[action.task.todoListId]: [
// 		// 			action.task,
// 		// 			...state[action.task.todoListId],
// 		// 		],
// 		// 	};
// 		// }
// 		// case "CHANGE-TASK-STATUS": {
// 		// 	const stateCopy = {
// 		// 		...state,
// 		// 		[action.todolistId]: state[action.todolistId].map((i) =>
// 		// 			i.id === action.taskId ? { ...i, status: action.isDone } : i
// 		// 		),
// 		// 	};
// 		// 	return stateCopy;
// 		// }

// 		// case "CHANGE-TASK-TITLE": {
// 		// 	const stateCopy = {
// 		// 		...state,
// 		// 		[action.todolistId]: state[action.todolistId].map((i) =>
// 		// 			i.id === action.taskId ? { ...i, title: action.title } : i
// 		// 		),
// 		// 	};
// 		// 	return stateCopy;
// 		// }
// 		// case "CHANGE-EDIT-MODE": {
// 		// 	const stateCopy = {
// 		// 		...state,
// 		// 		[action.todolistId]: state[action.todolistId].map((i) =>
// 		// 			i.id === action.taskId ? { ...i, editMode: action.editMode } : i
// 		// 		),
// 		// 	};
// 		// 	return stateCopy;
// 		// }
// 		// case "ADD-TODOLIST": {
// 		// 	const stateCopy = { ...state, [action.todolistId]: [] };
// 		// 	return stateCopy;
// 		// // }
// 		// case "REMOVE-TODOLIST": {
// 		// 	const stateCopy = { ...state };
// 		// 	delete stateCopy[action.id];
// 		// 	return stateCopy;
// 		// }
// 		default:
// 			return state;
// 	}
// };

// // export const removeTaskAC = (
// // 	taskId: string,
// // 	todolistId: string
// // ): RemoveTaskActionType => {
// // 	return { type: "REMOVE-TASK", todolistId, taskId };
// // };
// // export const addTaskAC = (task: TaskType): AddTaskActionType => {
// // 	return { type: "ADD-TASK", task };
// // };
// // export const changeTaskStatusAC = (
// // 	taskId: string,
// // 	isDone: TaskStatuses,
// // 	todolistId: string
// // ): ChangeTaskStatusActionType => {
// // 	return { type: "CHANGE-TASK-STATUS", isDone, todolistId, taskId };
// // };
// // export const changeTaskTitleAC = (
// // 	taskId: string,
// // 	title: string,
// // 	todolistId: string
// // ): ChangeTaskTitleActionType => {
// // 	return { type: "CHANGE-TASK-TITLE", title, todolistId, taskId };
// // };

// // export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
// // 	return { type: "SET-TASKS", tasks, todolistId } as const;
// // };

// // export const changeEditModeAC = (
// // 	taskId: string,
// // 	todolistId: string,
// // 	editMode: boolean
// // ) => {
// // 	return { type: "CHANGE-EDIT-MODE", taskId, todolistId, editMode } as const;
// // };

// export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
// 	dispatch(changeTaskEntityStatus({status: true}));
// 	todolistAPI
// 		.GetTask(todolistId)
// 		.then((res) => {
// 			dispatch(setTasksAC(res.data.items, todolistId));
// 			dispatch(changeTaskEntityStatus({status: false}));
// 		})
// 		.catch((err) => {
// 			dispatch(setAppError({ error: err.message }));
// 		});
// };

// export const removeTaskTC =
// 	(todolistId: string, taskId: string) => (dispatch: Dispatch) => {
// 		dispatch(changeTodolistEntityStatus({todolistId, status: "loading"}));
// 		todolistAPI
// 			.DeletTask(todolistId, taskId)
// 			.then((res) => {
// 				dispatch(removeTaskAC(taskId, todolistId));
// 				dispatch(changeTodolistEntityStatus({todolistId, status: "succeeded"}));
// 			})
// 			.catch((err) => {
// 				dispatch(setAppError({ error: err.message }));
// 				dispatch(changeTodolistEntityStatus({todolistId, status: "failed"}));
// 			});
// 	};

// export const addTaskTC =
// 	(title: string, todolistId: string) => (dispatch: Dispatch) => {
// 		dispatch(changeTodolistEntityStatus({todolistId, status: "loading"}));
// 		todolistAPI
// 			.CreateTask(todolistId, title)
// 			.then((res) => {
// 				if (res.data.resultCode === 0) {
// 					dispatch(addTaskAC(res.data.data.item));

// 					dispatch(changeTodolistEntityStatus({todolistId, status: "succeeded"}));
// 				} else {
// 					if (res.data.messages.length) {
// 						dispatch(setAppError({ error: res.data.messages[0] }));
// 					} else {
// 						dispatch(setAppError({ error: "Some error occurred" }));
// 					}

// 					dispatch(changeTodolistEntityStatus({todolistId, status: "failed"}));
// 				}
// 			})
// 			.catch((err) => {
// 				dispatch(setAppError({ error: err.message }));
// 				dispatch(changeTodolistEntityStatus({todolistId, status: "failed"}));
// 			});
// 	};

// export const changeTaskStatusTC =
// 	(todolistId: string, taskId: string, status: TaskStatuses) =>
// 	(dispatch: Dispatch, getState: () => AppRootStateType) => {
// 		const task = getState().tasks[todolistId].find((t) => {
// 			return t.id === taskId;
// 		});

// 		if (task) {
// 			const modal = {
// 				title: task.title,
// 				startDate: task.startDate,
// 				priority: task.priority,
// 				description: task.description,
// 				deadline: task.deadline,
// 				status: status,
// 			};
// 			dispatch(changeEditModeAC(taskId, todolistId, true));
// 			todolistAPI
// 				.UpdateTask(todolistId, taskId, modal)
// 				.then((res) => {
// 					dispatch(changeTaskStatusAC(taskId, status, todolistId));
// 					dispatch(changeEditModeAC(taskId, todolistId, false));
// 				})
// 				.catch((err) => {
// 					dispatch(setAppError({ error: err.message }));
// 					dispatch(changeEditModeAC(taskId, todolistId, false));
// 				});
// 		}
// 	};

// export const changeTaskTitleTC =
// 	(todolistId: string, taskId: string, title: string) =>
// 	(dispatch: Dispatch, getState: () => AppRootStateType) => {
// 		const task = getState().tasks[todolistId].find((t) => {
// 			return t.id === taskId;
// 		});

// 		if (task) {
// 			const modal = {
// 				title: title,
// 				startDate: task.startDate,
// 				priority: task.priority,
// 				description: task.description,
// 				deadline: task.deadline,
// 				status: task.status,
// 			};
// 			dispatch(changeEditModeAC(taskId, todolistId, true));
// 			todolistAPI
// 				.UpdateTask(todolistId, taskId, modal)
// 				.then((res) => {
// 					dispatch(changeTaskTitleAC(taskId, title, todolistId));
// 					dispatch(changeEditModeAC(taskId, todolistId, false));
// 				})
// 				.catch((err) => {
// 					dispatch(setAppError({ error: err.message }));
// 					dispatch(changeEditModeAC(taskId, todolistId, false));
// 				});
// 		}
// 	};
