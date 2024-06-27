import { useState } from "react";
import "./App.css";
import { Todolist } from "./components/Todolist/Todolist";
import { v1 } from "uuid";
import { AddInputList } from "./components/AddInputList/AddInputList";

export type TaskType = {
	id: string;
	title: string;
	isDone: boolean;
};

export type FiltredType = "All" | "Active" | "Completed";

type TodoListsType = {
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

	const getValueFilter = (value: FiltredType, id: string) => {
		const newTodoLists = todoLists.map((i) =>
			i.id === id ? { ...i, filtred: value } : i
		);
		setTodoLists(newTodoLists);
	};
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

	const addTodolist = (value: string) => {
		const newTodoListId = v1();
		setTodoLists([
			...todoLists,
			{ id: newTodoListId, title: value, filtred: "All" },
		]);

		setTasks({ ...tasks, [newTodoListId]: [] });
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
		console.log(newTitle);
	};

	const updateTodoListTitle = (newTitle: string, todoListId: string) => {
		setTodoLists(todoLists.map(i => i.id === todoListId ? {...i, title: newTitle} : i));
		
		
	};

	return (
		<div className="App">
			<AddInputList addItem={addTodolist} />
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
				);
			})}
		</div>
	);
}

export default App;
