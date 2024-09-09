import React, { useState } from "react";
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	setTodolistsAC,
	todolistsReducer,
} from "./todolists-reducer";
import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "./todolists-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistType>;

beforeEach(() => {
	todolistId1 = v1();
	todolistId2 = v1();

	startState = [
		{
			id: todolistId1,
			title: "What to learn",
			filter: "all",
			addedDate: "",
			order: 0,
			entityStatus: "idle",
			taskEntityStatus: false

		},
		{
			id: todolistId2,
			title: "What to buy",
			filter: "all",
			addedDate: "",
			order: 0,
			entityStatus: "idle",
			taskEntityStatus: false
		},
	];
});

test("correct todolist should be removed", () => {
	const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
	let newTodolistTitle = "New Todolist";

	const endState = todolistsReducer(
		startState,
		addTodolistAC(newTodolistTitle)
	);

	expect(endState.length).toBe(3);
	expect(endState[2].title).toBe(newTodolistTitle);
	expect(endState[2].filter).toBe("all");
	expect(endState[2].id).toBeDefined();
});

test("correct todolist should change its name", () => {
	let newTodolistTitle = "New Todolist";

	const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

	const endState = todolistsReducer(startState, action);

	expect(endState[0].title).toBe("What to learn");
	expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
	let newFilter: FilterValuesType = "completed";

	const action = changeTodolistFilterAC(todolistId2, newFilter);
	const endState = todolistsReducer(startState, action);

	expect(endState[0].filter).toBe("all");
	expect(endState[1].filter).toBe(newFilter);
});

test("get todolisrs and add filter", () => {
	const resultingArray = [
		{
			id: todolistId1,
			title: "What to learn",
			addedDate: "12.10.24",
			order: 0,
		},
		{ id: todolistId2, title: "What to buy", addedDate: "12.10.24", order: 0 },
	];

	const action = setTodolistsAC(resultingArray);
	const endState = todolistsReducer(startState, action);

	expect(Object.keys(endState[0]).includes("filter")).toBe(true);
	expect(endState[0].filter).toBe("all");
	expect(endState[1].filter).toBe("all");
});
