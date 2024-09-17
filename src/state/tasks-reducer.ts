import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskStatuses, TaskType, TodolistDomainType, todolistAPI } from "../api/todolist-api";
import {
    addTodolist,
	changeTaskEntityStatus,
	changeTodolistEntityStatus,
    removeTodolist,
    setTodolists,
} from "./todolists-reducer";
import { setAppError } from "./app-reducer";
import { AppRootStateType } from "./store";

export type TasksStateType = {
	[key: string]: TaskType[];
};

const initialState: TasksStateType = {};

const tasksSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		removeTask(
			state,
			action: PayloadAction<{ taskId: string; todolistId: string }>
		) {
			const index = state[action.payload.todolistId].findIndex(
				(i) => i.id === action.payload.taskId
			);
			if (index !== -1) state[action.payload.todolistId].splice(index, 1);
		},
		addTask(state, action: PayloadAction<{ task: TaskType }>) {
			state[action.payload.task.todoListId].unshift(action.payload.task);
		},
		changeTaskStatus(
			state,
			action: PayloadAction<{
				taskId: string;
				isDone: TaskStatuses;
				todolistId: string;
			}>
		) {
			const element = state[action.payload.todolistId].find(
				(i) => i.id === action.payload.taskId
			);
			if (element) element.status = action.payload.isDone;
		},
		changeTaskTitle(
			state,
			action: PayloadAction<{
				taskId: string;
				title: string;
				todolistId: string;
			}>
		) {
            const element = state[action.payload.todolistId].find(
				(i) => i.id === action.payload.taskId
			);
			if (element) element.title = action.payload.title;
        },
        setTasks(state, action: PayloadAction<{tasks: TaskType[], todolistId: string}>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
        changeEditMode(state, action: PayloadAction<{taskId: string,
            todolistId: string,
            editMode: boolean}>) {
                const element = state[action.payload.todolistId].find(
                    (i) => i.id === action.payload.taskId
                );
                if (element) element.editMode = action.payload.editMode;
        },
       
	},
    extraReducers(builder) {
        builder.addCase(addTodolist, (state, action: PayloadAction<{todolists: TodolistDomainType}>)=> {
            state[action.payload.todolists.id] = []
        })
        .addCase(removeTodolist, (state, action: PayloadAction<{todolistId: string }>)=> {
            delete state[action.payload.todolistId]
        })
        .addCase(setTodolists, (state, action: PayloadAction<{todos: TodolistDomainType[] }>)=> {
            action.payload.todos.forEach(i => {
                state[i.id] = []
            })
        })
    }
});

export const tasksReducer = tasksSlice.reducer;
export const { removeTask, addTask, changeTaskStatus, changeTaskTitle, setTasks, changeEditMode } = tasksSlice.actions;

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
	dispatch(changeTaskEntityStatus({ status: true }));
	todolistAPI
		.GetTask(todolistId)
		.then((res) => {
			dispatch(setTasks({tasks: res.data.items, todolistId}));
			dispatch(changeTaskEntityStatus({ status: false }));
		})
		.catch((err) => {
			dispatch(setAppError({ error: err.message }));
		});
};

export const removeTaskTC =
	(todolistId: string, taskId: string) => (dispatch: Dispatch) => {
		dispatch(changeTodolistEntityStatus({ todolistId, status: "loading" }));
		todolistAPI
			.DeletTask(todolistId, taskId)
			.then((res) => {
				dispatch(removeTask({taskId, todolistId}));
				dispatch(
					changeTodolistEntityStatus({ todolistId, status: "succeeded" })
				);
			})
			.catch((err) => {
				dispatch(setAppError({ error: err.message }));
				dispatch(changeTodolistEntityStatus({ todolistId, status: "failed" }));
			});
	};

export const addTaskTC =
	(title: string, todolistId: string) => (dispatch: Dispatch) => {
		dispatch(changeTodolistEntityStatus({ todolistId, status: "loading" }));
		todolistAPI
			.CreateTask(todolistId, title)
			.then((res) => {
				if (res.data.resultCode === 0) {
					dispatch(addTask({task: res.data.data.item}));

					dispatch(
						changeTodolistEntityStatus({ todolistId, status: "succeeded" })
					);
				} else {
					if (res.data.messages.length) {
						dispatch(setAppError({ error: res.data.messages[0] }));
					} else {
						dispatch(setAppError({ error: "Some error occurred" }));
					}

					dispatch(
						changeTodolistEntityStatus({ todolistId, status: "failed" })
					);
				}
			})
			.catch((err) => {
				dispatch(setAppError({ error: err.message }));
				dispatch(changeTodolistEntityStatus({ todolistId, status: "failed" }));
			});
	};

export const changeTaskStatusTC =
	(todolistId: string, taskId: string, status: TaskStatuses) =>
	(dispatch: Dispatch, getState: () => AppRootStateType) => {
		const task = getState().tasks[todolistId].find((t: { id: string }) => {
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
			dispatch(changeEditMode({taskId, todolistId, editMode: true}));
			todolistAPI
				.UpdateTask(todolistId, taskId, modal)
				.then((res) => {
					dispatch(changeTaskStatus({taskId, isDone: status, todolistId}));
					dispatch(changeEditMode({taskId, todolistId, editMode: false}));
				})
				.catch((err) => {
					dispatch(setAppError({ error: err.message }));
					dispatch(changeEditMode({taskId, todolistId, editMode: false}));
				});
		}
	};

export const changeTaskTitleTC =
	(todolistId: string, taskId: string, title: string) =>
	(dispatch: Dispatch, getState: () => AppRootStateType) => {
		const task = getState().tasks[todolistId].find((t: { id: string; }) => {
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
			dispatch(changeEditMode({taskId, todolistId, editMode: true}));
			todolistAPI
				.UpdateTask(todolistId, taskId, modal)
				.then((res) => {
					dispatch(changeTaskTitle({taskId, title, todolistId}));
					dispatch(changeEditMode({taskId, todolistId, editMode: false}));
				})
				.catch((err) => {
					dispatch(setAppError({ error: err.message }));
					dispatch(changeEditMode({taskId, todolistId, editMode: false}));
				});
		}
	};
