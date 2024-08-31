import { TasksStateType } from "../AppWithRedux";
import { v1 } from "uuid";
import {
	AddTodolistActionType,
	RemoveTodolistActionType,
	SetTodolistType,
} from "./todolists-reducer";
import { TaskStatuses, TaskType, todolistAPI } from "../api/todolist-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "./store";
import { setAppErrorAC, setAppStatusAC } from "./app-reducer";

export type RemoveTaskActionType = {
	type: "REMOVE-TASK";
	todolistId: string;
	taskId: string;
};
export type AddTaskActionType = {
	type: "ADD-TASK";
	task: TaskType;
};
export type ChangeTaskStatusActionType = {
	type: "CHANGE-TASK-STATUS";
	taskId: string;
	todolistId: string;
	isDone: TaskStatuses;
};
export type ChangeTaskTitleActionType = {
	type: "CHANGE-TASK-TITLE";
	taskId: string;
	todolistId: string;
	title: string;
};

export type setTasksType = ReturnType<typeof setTasksAC>;

type ActionsType =
	| RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTodolistType
	| setTasksType;

const initialState: TasksStateType = {};

export const tasksReducer = (
	state: TasksStateType = initialState,
	action: ActionsType
): TasksStateType => {
	// debugger
	switch (action.type) {
		case "SET-TASKS": {
			return { ...state, [action.todolistId]: action.tasks };
		}

		case "SET-TODOLISTS": {
			const newState = { ...state };
			action.todos.forEach((i) => {
				newState[i.id] = [];
			});
			return newState;
		}
		case "REMOVE-TASK": {
			const stateCopy = { ...state };
			const tasks = state[action.todolistId];
			const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
			stateCopy[action.todolistId] = filteredTasks;
			return stateCopy;
		}
		case "ADD-TASK": {
			return {
				...state,
				[action.task.todoListId]: [
					action.task,
					...state[action.task.todoListId],
				],
			};
		}
		case "CHANGE-TASK-STATUS": {
			const stateCopy = {
				...state,
				[action.todolistId]: state[action.todolistId].map((i) =>
					i.id === action.taskId ? { ...i, status: action.isDone } : i
				),
			};
			return stateCopy;
		}
		case "CHANGE-TASK-TITLE": {
			// debugger
			const a = action.title;
			const stateCopy = {
				...state,
				[action.todolistId]: state[action.todolistId].map((i) =>
					i.id === action.taskId ? { ...i, title: action.title } : i
				),
			};
			return stateCopy;
		}
		case "ADD-TODOLIST": {
			const stateCopy = { ...state, [action.todolistId]: [] };

			// stateCopy[action.todolistId] = [];

			return stateCopy;
		}
		case "REMOVE-TODOLIST": {
			const stateCopy = { ...state };
			delete stateCopy[action.id];
			return stateCopy;
		}
		default:
			return state;
	}
};

export const removeTaskAC = (
	taskId: string,
	todolistId: string
): RemoveTaskActionType => {
	return { type: "REMOVE-TASK", todolistId, taskId };
};
export const addTaskAC = (task: TaskType): AddTaskActionType => {
	return { type: "ADD-TASK", task };
};
export const changeTaskStatusAC = (
	taskId: string,
	isDone: TaskStatuses,
	todolistId: string
): ChangeTaskStatusActionType => {
	return { type: "CHANGE-TASK-STATUS", isDone, todolistId, taskId };
};
export const changeTaskTitleAC = (
	taskId: string,
	title: string,
	todolistId: string
): ChangeTaskTitleActionType => {
	return { type: "CHANGE-TASK-TITLE", title, todolistId, taskId };
};

export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
	return { type: "SET-TASKS", tasks, todolistId } as const;
};

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
	todolistAPI.GetTask(todolistId).then((res) => {
		dispatch(setTasksAC(res.data.items, todolistId));
	});
};

export const removeTaskTC =
	(todolistId: string, taskId: string) => (dispatch: Dispatch) => {
		todolistAPI
			.DeletTask(todolistId, taskId)
			.then((res) => dispatch(removeTaskAC(taskId, todolistId)));
	};

export const addTaskTC =
	(title: string, todolistId: string) => (dispatch: Dispatch) => {
		dispatch(setAppStatusAC("loading"));
		todolistAPI.CreateTask(todolistId, title).then((res) => {
			
			if (res.data.resultCode === 0) {
				dispatch(addTaskAC(res.data.data.item));
				dispatch(setAppStatusAC("succeeded"));
			} else {
				if (res.data.messages.length) {
					dispatch(setAppErrorAC(res.data.messages[0]));
				} else {
					dispatch(setAppErrorAC("Some error occurred"));
				}
				dispatch(setAppStatusAC("failed"));
			}
		});
	};

export const changeTaskStatusTC =
	(todolistId: string, taskId: string, status: TaskStatuses) =>
	(dispatch: Dispatch, getState: () => AppRootStateType) => {
		const task = getState().tasks[todolistId].find((t) => {
			return t.id === taskId;
		});

		if (task) {
			const modal = {
				title: task.title,
				startDate: task.startDate,
				priority: task.priority,
				description: task.description,
				deadline: task.deadline,
				status: status,
			};
			todolistAPI
				.UpdateTask(todolistId, taskId, modal)
				.then((res) =>
					dispatch(changeTaskStatusAC(taskId, status, todolistId))
				);
		}
	};

export const changeTaskTitleTC =
	(todolistId: string, taskId: string, title: string) =>
	(dispatch: Dispatch, getState: () => AppRootStateType) => {
		const task = getState().tasks[todolistId].find((t) => {
			return t.id === taskId;
		});

		if (task) {
			const modal = {
				title: title,
				startDate: task.startDate,
				priority: task.priority,
				description: task.description,
				deadline: task.deadline,
				status: task.status,
			};
			todolistAPI
				.UpdateTask(todolistId, taskId, modal)
				.then((res) => dispatch(changeTaskTitleAC(taskId, title, todolistId)));
		}
	};
