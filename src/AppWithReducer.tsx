// import React, { useReducer } from "react";
// import "./App.css";
// import { TaskType, Todolist } from "./Todolist";
// import { v1 } from "uuid";
// import { AddItemForm } from "./AddItemForm";
// import {
// 	AppBar,
// 	Button,
// 	Container,
// 	Grid,
// 	Paper,
// 	Toolbar,
// 	Typography,
// } from "@mui/material";
// import IconButton from "@mui/material/IconButton/IconButton";
// import { Menu } from "@mui/icons-material";
// import {
// 	addTodolistAC,
// 	changeTodolistFilterAC,
// 	changeTodolistTitleAC,
// 	removeTodolistAC,
// 	todolistsReducer,
// } from "./state/todolists-reducer";
// import {
// 	addTaskAC,
// 	changeTaskStatusAC,
// 	changeTaskTitleAC,
// 	removeTaskAC,
// 	tasksReducer,
// } from "./state/tasks-reducer";

// export type FilterValuesType = "all" | "active" | "completed";
// export type TodolistType = {
// 	id: string;
// 	title: string;
// 	filter: FilterValuesType;
// };

// export type TasksStateType = {
// 	[key: string]: Array<TaskType>;
// };

// export function AppWithReducer() {
// 	let todolistId1 = v1();
// 	let todolistId2 = v1();

// 	const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
// 		{ id: todolistId1, title: "What to learn", filter: "all" },
// 		{ id: todolistId2, title: "What to buy", filter: "all" },
// 	]);

    
    

// 	const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
// 		[todolistId1]: [
// 			{ id: v1(), title: "HTML&CSS", isDone: true },
// 			{ id: v1(), title: "JS", isDone: true },
// 		],
// 		[todolistId2]: [
// 			{ id: v1(), title: "Milk", isDone: true },
// 			{ id: v1(), title: "React Book", isDone: true },
// 		],
// 	});

//     // console.log(tasks[todolists[0].id]);

// 	function removeTask(id: string, todolistId: string) {
// 		dispatchToTasksReducer(removeTaskAC(id, todolistId));
// 	}

// 	function addTask(title: string, todolistId: string) {
// 		dispatchToTasksReducer(addTaskAC(title, todolistId));
// 	}

// 	function changeStatus(id: string, isDone: boolean, todolistId: string) {
// 		dispatchToTasksReducer(changeTaskStatusAC(id, isDone, todolistId));
// 	}

// 	function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
// 		dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId));
// 	}

// 	function changeFilter(value: FilterValuesType, todolistId: string) {
// 		dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value));
// 	}

// 	function removeTodolist(id: string) {
// 		dispatchToTodolistsReducer(removeTodolistAC(id));
// 		dispatchToTasksReducer(removeTodolistAC(id));
// 	}

// 	function changeTodolistTitle(id: string, title: string) {
// 		dispatchToTodolistsReducer(changeTodolistTitleAC(id, title));
// 	}

// 	function addTodolist(title: string) {
// 		dispatchToTasksReducer(addTodolistAC(title));
// 		dispatchToTodolistsReducer(addTodolistAC(title));
// 	}

// 	return (
// 		<div className="App">
// 			<AppBar position="static">
// 				<Toolbar>
// 					<IconButton edge="start" color="inherit" aria-label="menu">
// 						<Menu />
// 					</IconButton>
// 					<Typography variant="h6">News</Typography>
// 					<Button color="inherit">Login</Button>
// 				</Toolbar>
// 			</AppBar>
// 			<Container fixed>
// 				<Grid container style={{ padding: "20px" }}>
// 					<AddItemForm addItem={addTodolist} />
// 				</Grid>
// 				<Grid container spacing={3}>
// 					{todolists.map((tl) => {
// 						let allTodolistTasks = tasks[tl.id];
// 						let tasksForTodolist = allTodolistTasks;

// 						if (tl.filter === "active") {
// 							tasksForTodolist = allTodolistTasks.filter(
// 								(t) => t.isDone === false
// 							);
// 						}
// 						if (tl.filter === "completed") {
// 							tasksForTodolist = allTodolistTasks.filter(
// 								(t) => t.isDone === true
// 							);
// 						}

// 						return (
// 							<Grid key={tl.id} item>
// 								<Paper style={{ padding: "10px" }}>
// 									<Todolist
// 										key={tl.id}
// 										id={tl.id}
// 										title={tl.title}
// 										tasks={tasksForTodolist}
// 										removeTask={removeTask}
// 										changeFilter={changeFilter}
// 										addTask={addTask}
// 										changeTaskStatus={changeStatus}
// 										filter={tl.filter}
// 										removeTodolist={removeTodolist}
// 										changeTaskTitle={changeTaskTitle}
// 										changeTodolistTitle={changeTodolistTitle}
// 									/>
// 								</Paper>
// 							</Grid>
// 						);
// 					})}
// 				</Grid>
// 			</Container>
// 		</div>
// 	);
// }


