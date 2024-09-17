import { useDispatch } from "react-redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import { AnyAction, applyMiddleware, combineReducers } from "redux";
import { thunk, ThunkDispatch } from "redux-thunk";
import { appReducer } from "./app-reducer";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer,
	auth: authReducer,
});
// непосредственно создаём store
// export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
	reducer: rootReducer,
});
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
