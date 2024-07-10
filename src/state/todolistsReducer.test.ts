import { v1 } from "uuid";
import { TodoListsType } from "../App";
import { addTodolistAC, changeTodolistFilterAC, todolistsReducer, updateTodolistTitleAC } from "./todolistsReducer";

test("add-todolist", () => {
	const todoListId1 = v1();
	const todoListId2 = v1();

	const TodoLists: Array<TodoListsType> = [
		{ id: todoListId1, title: "What to learn", filtred: "All" },
		{ id: todoListId2, title: "What to buy", filtred: "All" },
	];

	const reducer = todolistsReducer(TodoLists, addTodolistAC("1111"));

	expect(reducer[2].title).toBe("1111");
	expect(reducer.length).toBe(3);
});

test("update-todolist-title", () => {
	const todoListId1 = v1();
	const todoListId2 = v1();

	const TodoLists: Array<TodoListsType> = [
		{ id: todoListId1, title: "What to learn", filtred: "All" },
		{ id: todoListId2, title: "What to buy", filtred: "All" },
	];

	const reducer = todolistsReducer(TodoLists, updateTodolistTitleAC("1111", todoListId2));

	expect(reducer[1].title).toBe("1111");
});

test("change-todolist-filter", () => {
	const todoListId1 = v1();
	const todoListId2 = v1();

	const TodoLists: Array<TodoListsType> = [
		{ id: todoListId1, title: "What to learn", filtred: "All" },
		{ id: todoListId2, title: "What to buy", filtred: "All" },
	];

	const reducer = todolistsReducer(TodoLists, changeTodolistFilterAC("Completed",todoListId2));

	expect(reducer[1].filtred).toBe("Completed");
});
