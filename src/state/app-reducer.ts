import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type ErrorStateType = string | null;

const initialState = {
	isInitialized: false as boolean,
	status: "idle" as RequestStatusType,
	error: null as ErrorStateType,
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
			state.status = action.payload.status;
		},
		setAppError(state, action: PayloadAction<{ error: ErrorStateType }>) {
			state.error = action.payload.error;
		},
		setAppInitialized(state,action: PayloadAction<{ isInitialized: boolean }>) {
			state.isInitialized = action.payload.isInitialized;
		},
	},
    selectors: {
        selectorAppStatus(sliceState) {
            return sliceState.status
        },
        selectorAppError(sliceState) {
            return sliceState.error
        },
        selectorAppInitialized(sliceState) {
            return sliceState.isInitialized
        }
    }
});

export const appReducer = appSlice.reducer
export const {setAppStatus, setAppError, setAppInitialized} = appSlice.actions
export const {selectorAppStatus, selectorAppError, selectorAppInitialized} = appSlice.selectors

