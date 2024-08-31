export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type ErrorStateType = string | null

const initialState = {
	status: "idle" as RequestStatusType,
    error: null as ErrorStateType
};

export type InitialStateType = typeof initialState;

export const appReducer = (
	state: InitialStateType = initialState,
	action: ActionsType
): InitialStateType => {
	switch (action.type) {
		case "APP/SET-STATUS":
			return { ...state, status: action.status };
		case "APP/SET-ERROR":
			return { ...state, error: action.error };
		default:
			return state;
	}
};

type ActionsType =
	| ReturnType<typeof setAppStatusAC>
	| ReturnType<typeof setAppErrorAC>;

export const setAppStatusAC = (status: RequestStatusType) =>
	({ type: "APP/SET-STATUS", status }) as const;

export const setAppErrorAC = (error: ErrorStateType) =>
	({ type: "APP/SET-ERROR", error }) as const;
