// import { FilterValuesType, TodolistType } from "../App";
import { v1 } from "uuid";
import { TodolistDomainType, todolistAPI } from "../api/todolist-api";
import { Dispatch } from "redux";
import { RequestStatusType, setAppErrorAC, setAppStatusAC } from "./app-reducer";

export type FilterValuesType = "all" | "active" | "completed";

// export type TodolistType = {
// 	id: string;
// 	title: string;
// 	filter?: FilterValuesType;
// };

export type TodolistType = TodolistDomainType & {
	filter: FilterValuesType;
	entityStatus: RequestStatusType
};

export type RemoveTodolistActionType = {
	type: "REMOVE-TODOLIST";
	id: string;
};
export type AddTodolistActionType = {
	type: "ADD-TODOLIST";
	title: string;
	todolistId: string;
};
export type ChangeTodolistTitleActionType = {
	type: "CHANGE-TODOLIST-TITLE";
	id: string;
	title: string;
};
export type ChangeTodolistFilterActionType = {
	type: "CHANGE-TODOLIST-FILTER";
	id: string;
	filter: FilterValuesType;
};

export type SetTodolistType = ReturnType<typeof setTodolistsAC>;
export type ChangeTodolistEntityStatus = ReturnType<typeof changeTodolistEntityStatusAC>

type ActionsType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType
	| SetTodolistType
	| ChangeTodolistEntityStatus

const initialState: Array<TodolistType> = [
];

export const todolistsReducer = (
	state: Array<TodolistType> = initialState,
	action: ActionsType
): Array<TodolistType> => {
	switch (action.type) {
		case "SET-TODOLISTS": {
			return action.todos.map((i) => {
				return { ...i, filter: "all", entityStatus: "idle" };
			});
		}
		case "CHANGE-TODOLIST-ENTITY-STATUS": {
			return state.map((i) => {
				return i.id === action.id ? { ...i, entityStatus: action.status } : i;
			});
		}
		case "REMOVE-TODOLIST": {
			return state.filter((tl) => tl.id != action.id);
		}
		case "ADD-TODOLIST": {
			return [
				{
					id: action.todolistId,
					title: action.title,
					filter: "all",
					addedDate: "",
					order: 0,
					entityStatus: "idle"
				},
				...state,
			];
		}
		case "CHANGE-TODOLIST-TITLE": {
			const todolist = state.find((tl) => tl.id === action.id);
			if (todolist) {
				// если нашёлся - изменим ему заголовок
				todolist.title = action.title;
			}
			return [...state];
		}
		case "CHANGE-TODOLIST-FILTER": {
			const todolist = state.find((tl) => tl.id === action.id);
			if (todolist) {
				// если нашёлся - изменим ему заголовок
				todolist.filter = action.filter;
			}
			return [...state];
		}
		default:
			return state;
	}
};

export const removeTodolistAC = (
	todolistId: string
): RemoveTodolistActionType => {
	return { type: "REMOVE-TODOLIST", id: todolistId };
};
export const addTodolistAC = (title: string): AddTodolistActionType => {
	return { type: "ADD-TODOLIST", title, todolistId: v1() };
};
export const changeTodolistTitleAC = (
	todolistId: string,
	title: string
): ChangeTodolistTitleActionType => {
	return { type: "CHANGE-TODOLIST-TITLE", title: title, id: todolistId };
};
export const changeTodolistFilterAC = (
	todolistId: string,
	filter: FilterValuesType
): ChangeTodolistFilterActionType => {
	return { type: "CHANGE-TODOLIST-FILTER", filter, id: todolistId };
};
export const setTodolistsAC = (todos: TodolistDomainType[]) => {
	return { type: "SET-TODOLISTS", todos } as const;
};

export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
	({
	  type: 'CHANGE-TODOLIST-ENTITY-STATUS',
	  id,
	  status,
	}) as const

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC("loading"));
	todolistAPI.GetTodolists().then((res) => {
		dispatch(setTodolistsAC(res.data));
		dispatch(setAppStatusAC("succeeded"));
	}).catch((err)=> {
		dispatch(setAppErrorAC(err.message))
		dispatch(setAppStatusAC("failed"))
	});
};

export const changeTodolistsTitleTC =
	(todolistId: string, title: string) => (dispatch: Dispatch) => {
		dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
		todolistAPI
			.UpdateTodolist(todolistId, title)
			.then((res) => {
				dispatch(changeTodolistTitleAC(todolistId, title))
				dispatch(changeTodolistEntityStatusAC(todolistId, "succeeded"))
			}).catch((err)=> {
				dispatch(setAppErrorAC(err.message))
				dispatch(setAppStatusAC("failed"))
			});
	};

export const addTodolistsTC = (title: string) => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC("loading"));
	todolistAPI.CreateTodolist(title).then((res) => {
		if (res.data.resultCode === 0) {
			dispatch(addTodolistAC(title));
			dispatch(setAppStatusAC("succeeded"));
		} else {
			if (res.data.messages.length) {
				dispatch(setAppErrorAC(res.data.messages[0]));
			} else {
				dispatch(setAppErrorAC("Some error occurred"));
			}
			dispatch(setAppStatusAC("failed"));
		}
	}).catch((err)=> {
		dispatch(setAppErrorAC(err.message))
		dispatch(setAppStatusAC("failed"))
	});
};

export const removeTodolistsTC =
	(todolistId: string) => (dispatch: Dispatch) => {
		// dispatch(setAppStatusAC("loading"));
		dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
		todolistAPI.DeleteTodolist(todolistId).then((res) => {
			dispatch(removeTodolistAC(todolistId));
			// dispatch(setAppStatusAC("succeeded"));
			dispatch(changeTodolistEntityStatusAC(todolistId, "succeeded"))
		}).catch((err)=> {
			dispatch(setAppErrorAC(err.message))
			dispatch(changeTodolistEntityStatusAC(todolistId, "failed"))
		});
	};
