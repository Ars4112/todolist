import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodolistDomainType, todolistAPI } from "../api/todolist-api";
import { RequestStatusType, setAppError, setAppStatus } from "./app-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = TodolistDomainType & {
	filter: FilterValuesType;
	entityStatus: RequestStatusType;
	taskEntityStatus: boolean;
};

const initialState: TodolistType[] = [];

const todolistsSlice = createSlice({
	name: "todolists",
	initialState,
	reducers: {
		removeTodolist(state, action: PayloadAction<{ todolistId: string }>) {
			const index = state.findIndex((i) => i.id === action.payload.todolistId);
			if (index !== -1) state.splice(index, 1);
		},
		addTodolist(
			state,
			action: PayloadAction<{ todolists: TodolistDomainType }>
		) {
			state.unshift({
				...action.payload.todolists,
				entityStatus: "idle",
				taskEntityStatus: false,
				filter: "all",
			});
		},
		changeTodolistTitle(
			state,
			action: PayloadAction<{ todolistId: string; title: string }>
		) {
			const index = state.findIndex((i) => i.id === action.payload.todolistId);
			if (index !== -1) state[index].title = action.payload.title;
		},
		changeTodolistFilter(
			state,
			action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>
		) {
			const index = state.findIndex((i) => i.id === action.payload.todolistId);
			if (index !== -1) state[index].filter = action.payload.filter;
		},
		setTodolists(
			state,
			action: PayloadAction<{ todos: TodolistDomainType[] }>
		) {
			return action.payload.todos.forEach((i) => {
				state.push({
					...i,
					filter: "all",
					entityStatus: "idle",
					taskEntityStatus: false,
				});
			});
		},
		changeTodolistEntityStatus(
			state,
			action: PayloadAction<{ todolistId: string; status: RequestStatusType }>
		) {
			const element = state.find((i) => i.id === action.payload.todolistId);
			if (element) element.entityStatus = action.payload.status;
		},
		changeTaskEntityStatus(state, action: PayloadAction<{ status: boolean }>) {
			state.forEach((i) => {
				i.taskEntityStatus = action.payload.status;
			});
		},
	},
});

export const todolistsReducer = todolistsSlice.reducer;

export const {
	removeTodolist,
	addTodolist,
	changeTodolistTitle,
	changeTodolistFilter,
	setTodolists,
	changeTodolistEntityStatus,
	changeTaskEntityStatus,
} = todolistsSlice.actions;

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
	dispatch(setAppStatus({ status: "loading" }));
	todolistAPI
		.GetTodolists()
		.then((res) => {
			dispatch(setTodolists({ todos: res.data }));
			dispatch(setAppStatus({ status: "succeeded" }));
		})
		.catch((err) => {
			dispatch(setAppError({ error: err.message }));
			dispatch(setAppStatus({ status: "failed" }));
		});
};

export const changeTodolistsTitleTC =
	(todolistId: string, title: string) => (dispatch: Dispatch) => {
		dispatch(changeTodolistEntityStatus({ todolistId, status: "loading" }));
		todolistAPI
			.UpdateTodolist(todolistId, title)
			.then((res) => {
				dispatch(changeTodolistTitle({ todolistId, title }));
				dispatch(
					changeTodolistEntityStatus({ todolistId, status: "succeeded" })
				);
			})
			.catch((err) => {
				dispatch(setAppError({ error: err.message }));
				dispatch(setAppStatus({ status: "failed" }));
			});
	};

export const addTodolistsTC = (title: string) => (dispatch: Dispatch) => {
	dispatch(setAppStatus({ status: "loading" }));
	todolistAPI
		.CreateTodolist(title)
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(addTodolist({ todolists: res.data.data.item }));
				dispatch(setAppStatus({ status: "succeeded" }));
			} else {
				if (res.data.messages.length) {
					dispatch(setAppError({ error: res.data.messages[0] }));
				} else {
					dispatch(setAppError({ error: "Some error occurred" }));
				}
				dispatch(setAppStatus({ status: "failed" }));
			}
		})
		.catch((err) => {
			dispatch(setAppError({ error: err.message }));
			dispatch(setAppStatus({ status: "failed" }));
		});
};

export const removeTodolistsTC =
	(todolistId: string) => (dispatch: Dispatch) => {
		// dispatch(setAppStatusAC("loading"));
		dispatch(changeTodolistEntityStatus({ todolistId, status: "loading" }));
		todolistAPI
			.DeleteTodolist(todolistId)
			.then((res) => {
				dispatch(removeTodolist({ todolistId }));
				// dispatch(setAppStatusAC("succeeded"));
				dispatch(
					changeTodolistEntityStatus({ todolistId, status: "succeeded" })
				);
			})
			.catch((err) => {
				dispatch(setAppError({ error: err.message }));
				dispatch(changeTodolistEntityStatus({ todolistId, status: "failed" }));
			});
	};
