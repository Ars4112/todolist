import { useState } from "react";
import "./App.css";
import { Todolist } from "./components/Todolist/Todolist";
import { v1 } from "uuid";
import { AddInputList } from "./components/AddInputList/AddInputList";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { MenuButton } from "./components/Button/MenuButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";

export type TaskType = {
	id: string;
	title: string;
	isDone: boolean;
};

export type FiltredType = "All" | "Active" | "Completed";

type ThemeMode = "light" | "dark";

export type TodoListsType = {
	id: string;
	title: string;
	filtred: FiltredType;
};

function App() {
	const todoListId1 = v1();
	const todoListId2 = v1();

	const initTasks = {
		[todoListId1]: [
			{ id: v1(), title: "HTML&CSS", isDone: true },
			{ id: v1(), title: "JS", isDone: true },
			{ id: v1(), title: "ReactJS", isDone: false },
			{ id: v1(), title: "Redux", isDone: false },
			{ id: v1(), title: "Typescript", isDone: false },
			{ id: v1(), title: "RTK query", isDone: false },
		],
		[todoListId2]: [
			{ id: v1(), title: "HTML&CSS", isDone: true },
			{ id: v1(), title: "JS", isDone: true },
			{ id: v1(), title: "ReactJS", isDone: false },
		],
	};

	const initTodoLists: Array<TodoListsType> = [
		{ id: todoListId1, title: "What to learn", filtred: "All" },
		{ id: todoListId2, title: "What to buy", filtred: "All" },
	];

	const [tasks, setTasks] = useState(initTasks);
	const [todoLists, setTodoLists] =
		useState<Array<TodoListsType>>(initTodoLists);

	const [themeMode, setThemeMode] = useState<ThemeMode>("light");

	const changeInputRadioStatus = (
		taskId: string,
		status: boolean,
		todoListId: string
	) => {
		const newTasks = tasks[todoListId].map((i) =>
			i.id === taskId ? { ...i, isDone: status } : i
		);
		setTasks({ ...tasks, [todoListId]: newTasks });
	};

	const addTask = (value: string, todoListId: string) => {
		const newTask = { id: v1(), title: value, isDone: false };
		setTasks({ ...tasks, [todoListId]: [newTask, ...tasks[todoListId]] });
	};

	const removeTask = (taskId: string, todoListId: string) => {
		const changeTasks = {
			...tasks,
			[todoListId]: tasks[todoListId].filter((el) => taskId !== el.id),
		};
		setTasks(changeTasks);
	};

	const updateTask = (newTitle: string, todoListId: string, id: string) => {
		setTasks({
			...tasks,
			[todoListId]: tasks[todoListId].map((i) =>
				i.id === id ? { ...i, title: newTitle } : i
			),
		});
	};

	const addTodolist = (value: string) => {
		const newTodoListId = v1();
		setTodoLists([
			...todoLists,
			{ id: newTodoListId, title: value, filtred: "All" },
		]);

		setTasks({ ...tasks, [newTodoListId]: [] });
	};

	const updateTodoListTitle = (newTitle: string, todoListId: string) => {
		setTodoLists(
			todoLists.map((i) =>
				i.id === todoListId ? { ...i, title: newTitle } : i
			)
		);
	};

	const getValueFilter = (value: FiltredType, id: string) => {
		const newTodoLists = todoLists.map((i) =>
			i.id === id ? { ...i, filtred: value } : i
		);
		setTodoLists(newTodoLists);
	};

	const theme = createTheme({
		palette: {
			mode: themeMode === "light" ? "light" : "dark",
			primary: {
				main: "#ef6c00",
			},
		},
	});

	const changeModeHandler = () => {
		setThemeMode(themeMode === "light" ? "dark" : "light");
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="App">
				<AppBar position="static" sx={{ mb: "30px" }}>
					<Toolbar
						variant="dense"
						sx={{ display: "flex", justifyContent: "space-between" }}
					>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						<div>
							<MenuButton>Login</MenuButton>
							<MenuButton>Logout</MenuButton>
							<MenuButton background={`${theme.palette.primary.dark}`}>
								Faq
							</MenuButton>
							<Switch color={"default"} onChange={changeModeHandler} />
						</div>
					</Toolbar>
				</AppBar>
				<Container>
					<Grid container sx={{ mb: "30px" }}>
						<AddInputList addItem={addTodolist} />
					</Grid>
					<Grid container spacing={2}>
						{todoLists.map((i) => {
							let filtredArrayTasks = tasks[i.id];
							switch (i.filtred) {
								case "All":
									filtredArrayTasks = tasks[i.id];
									break;

								case "Active":
									filtredArrayTasks = filtredArrayTasks.filter(
										(el) => el.isDone === false
									);
									break;

								case "Completed":
									filtredArrayTasks = filtredArrayTasks.filter(
										(el) => el.isDone === true
									);
									break;
							}
							return (
								<Grid item>
									<Paper sx={{ p: "20px" }}>
										<Todolist
											key={i.id}
											todoListId={i.id}
											title={i.title}
											tasks={filtredArrayTasks}
											addTask={addTask}
											getValueFilter={getValueFilter}
											changeInputRadioStatus={changeInputRadioStatus}
											filtredTasks={i.filtred}
											removeTask={removeTask}
											updateTask={updateTask}
											updateTodoListTitle={updateTodoListTitle}
										/>
									</Paper>
								</Grid>
							);
						})}
					</Grid>
				</Container>
			</div>
		</ThemeProvider>
	);
}

export default App;
