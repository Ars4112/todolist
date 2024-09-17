import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { setAppError, setAppInitialized, setAppStatus} from "./app-reducer";
import { LoginParamsType, authAPI } from "../api/todolist-api";

const initialState = {
	isLoggedIn: false,
};

type InitialStateType = typeof initialState;

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{isLoggedIn: boolean}>) {
            state.isLoggedIn= action.payload.isLoggedIn 
        }
    }
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions.setIsLoggedIn

export const loginTC =
	(data: LoginParamsType) => (dispatch: Dispatch) => {
		dispatch(setAppStatus({status: "loading"}));
		authAPI
			.login(data)
			.then((res) => {
				if (res.data.resultCode === 0) {
					dispatch(authActions({isLoggedIn:true}));
				} else {
					if (res.data.messages.length) {
						dispatch(setAppError({error: res.data.messages[0]}));
					} else {
						dispatch(setAppError({error: "Some error occurred"}));
					}
					// dispatch(setAppStatusAC("failed"));
					// dispatch(changeTodolistEntityStatusAC(todolistId, "failed"));
				}
			})
			.catch((err) => {
				dispatch(authActions({isLoggedIn:false}));
			})
			.finally(() => dispatch(setAppStatus({status: "idle"})));
	};

export const initializeAppTC = () => (dispatch: Dispatch) => {
	authAPI
		.me()
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(authActions({isLoggedIn:true}));
			}
		})
		.finally(() => dispatch(setAppInitialized({isInitialized: true})));
};

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
	authAPI.logOut().then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(authActions({isLoggedIn:false}));
			}
		})
		.finally(() => dispatch(setAppStatus({status: "idle"})));
};

