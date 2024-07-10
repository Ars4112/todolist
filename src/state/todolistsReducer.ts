import { v1 } from "uuid";
import { FiltredType, TodoListsType } from "../App";


const todoListId1 = v1();
const todoListId2 = v1();

type addTodolistType = {
    type: "ADD-TODOLIST"
    payload: {
        title: string
    }
}

type UpdateTodolistTitleType = {
    type: "UPDATE-TODOLIST-TITLE"
    payload: {
        title: string
        id: string
    }
}

type ChangeTodolistFilterType = {
    type: "CHANGE-TODOLIST-FILTER"
    payload: {
        filtred: FiltredType
        id: string
    }
}

export type ActionType = addTodolistType | UpdateTodolistTitleType | ChangeTodolistFilterType;


const initTodoLists: Array<TodoListsType> = [
	{ id: todoListId1, title: "What to learn", filtred: "All" },
	{ id: todoListId2, title: "What to buy", filtred: "All" },
];

export const todolistsReducer = (
	state: Array<TodoListsType> = initTodoLists,
	action: ActionType
) => {
	switch (action.type) {
		case "ADD-TODOLIST": {
            return [...state, { id: v1(), title: action.payload.title, filtred: "All" }];
		}
        case "UPDATE-TODOLIST-TITLE": {
            return state.map((i) =>
				i.id === action.payload.id ? { ...i, title: action.payload.title } : i
			);
		}
        case "CHANGE-TODOLIST-FILTER": {
            return state.map((i) =>
                i.id === action.payload.id ? { ...i, filtred: action.payload.filtred } : i
            );
		}

		default:
			return state;
	}
};

export const addTodolistAC = (title: string): addTodolistType=> ({type: "ADD-TODOLIST", payload: {title}})
export const updateTodolistTitleAC = (title: string, id: string): UpdateTodolistTitleType=> ({type: "UPDATE-TODOLIST-TITLE", payload: {title, id}})
export const changeTodolistFilterAC = (filtred: FiltredType, id: string): ChangeTodolistFilterType=> ({type: "CHANGE-TODOLIST-FILTER", payload: {filtred, id}})