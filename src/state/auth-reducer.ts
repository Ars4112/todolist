import { Dispatch } from "redux";
import {
	SetAppErrorActionType,
	SetAppInitializedType,
	SetAppStatusActionType,
	setAppErrorAC,
	setAppInitializedAC,
	setAppStatusAC,
} from "./app-reducer";
import { LoginParamsType, authAPI } from "../api/todolist-api";

const initialState = {
	isLoggedIn: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (
	state: InitialStateType = initialState,
	action: ActionsType
): InitialStateType => {
	switch (action.type) {
		case "login/SET-IS-LOGGED-IN": {
			return { ...state, isLoggedIn: action.value };
		}
		default:
			return state;
	}
};
// actions
export const setIsLoggedInAC = (value: boolean) =>
	({ type: "login/SET-IS-LOGGED-IN", value }) as const;

// thunks
export const loginTC =
	(data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
		dispatch(setAppStatusAC("loading"));
		authAPI
			.login(data)
			.then((res) => {
				if (res.data.resultCode === 0) {
					dispatch(setIsLoggedInAC(true));
				} else {
					if (res.data.messages.length) {
						dispatch(setAppErrorAC(res.data.messages[0]));
					} else {
						dispatch(setAppErrorAC("Some error occurred"));
					}
					// dispatch(setAppStatusAC("failed"));
					// dispatch(changeTodolistEntityStatusAC(todolistId, "failed"));
				}
			})
			.catch((err) => {
				dispatch(setIsLoggedInAC(false));
			})
			.finally(() => dispatch(setAppStatusAC("idle")));
	};

export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
	authAPI
		.me()
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(true));
			}
		})
		.finally(() => dispatch(setAppInitializedAC(true)));
};

export const logOutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
	authAPI.logOut().then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(false));
			}
		})
		.finally(() => dispatch(setAppStatusAC("idle")));
};

// types
type ActionsType =
	| ReturnType<typeof setIsLoggedInAC>
	| SetAppStatusActionType
	| SetAppErrorActionType
	| SetAppInitializedType;
