export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type ErrorStateType = string | null;

const initialState = {
	isInitialized: false as boolean,
	status: "idle" as RequestStatusType,
	error: null as ErrorStateType,
};

export type InitialStateType = typeof initialState;

export const appReducer = (
	state: InitialStateType = initialState,
	action: ActionsType
): InitialStateType => {
	switch (action.type) {
		case "APP/SET-STATUS":
			return { ...state, status: action.status };
		case "APP/SET-INITIALIZED":
			return { ...state, isInitialized: action.isInitialized };
		case "APP/SET-ERROR":
			return { ...state, error: action.error };
		default:
			return state;
	}
};

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppInitializedType = ReturnType<typeof setAppInitializedAC>;

type ActionsType =
	| SetAppStatusActionType
	| SetAppErrorActionType
	| SetAppInitializedType;

export const setAppStatusAC = (status: RequestStatusType) =>
	({ type: "APP/SET-STATUS", status }) as const;

export const setAppErrorAC = (error: ErrorStateType) =>
	({ type: "APP/SET-ERROR", error }) as const;

export const setAppInitializedAC = (isInitialized: boolean) =>
	({ type: "APP/SET-INITIALIZED", isInitialized }) as const;


