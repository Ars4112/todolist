import { useEffect, useState } from "react";
import { todolistAPI } from "./api/todolist-api";

export default {
	title: "API",
};

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null);
    console.log(state);
    
	useEffect(() => {
		todolistAPI.GetTodolists().then((res) => {
			setState(res);
		});
	}, []);
	return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null);
	const title = "React";
	useEffect(() => {
		todolistAPI.CreateTodolist(title).then((res) => {
			setState(res.data);
		});
	}, []);

	return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null);
	const todolistId = "cfff018f-673c-4770-b16b-ef5646c7cbac";
	useEffect(() => {
		todolistAPI.DeleteTodolist(todolistId).then((res) => {
			setState(res.data);
		});
	}, []);

	return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null);
	const todolistId = "dbc1da64-525d-4dac-a03a-6f5de0fff020";
	const title = "Redux";
	useEffect(() => {
		todolistAPI.UpdateTodolist(todolistId, title).then((res) => {
			setState(res.data);
		});
	}, []);

	return <div>{JSON.stringify(state)}</div>;
};

export const GetTask = () => {
	const [state, setState] = useState<any>(null);
	const todolistId = "dbc1da64-525d-4dac-a03a-6f5de0fff020";
    // console.log(state);
    
	useEffect(() => {
		todolistAPI.GetTask(todolistId).then((res) => {
			setState(res.data);
		});
	}, []);

	return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
	const [state, setState] = useState<any>(null);
	const [title, setTitle] = useState<string>("");
	const todolistId = "dbc1da64-525d-4dac-a03a-6f5de0fff020";

	const CreateTaskHandler = () => {
		todolistAPI.CreateTask(todolistId, title).then((res) => {
			setState(res.data);
		});
	};

	return (
		<div>
			{JSON.stringify(state)}
			<div>
				<input
					type="text"
					placeholder="Task Title"
					value={title}
					onChange={(e) => setTitle(e.currentTarget.value)}
				/>
				<button onClick={CreateTaskHandler}>Create Task</button>
			</div>
		</div>
	);
};

export const DeletTask = () => {
	const [state, setState] = useState<any>(null);
	const todolistId = "dbc1da64-525d-4dac-a03a-6f5de0fff020";
	const taskId = "18b4df0c-e156-416c-8446-9092bf2b53bc";

	const DeletTaskHandler = () => {
		todolistAPI.DeletTask(todolistId, taskId).then((res) => {
			setState(res.data);
		});
	};

	return (
		<div>
			{JSON.stringify(state)}
			<div>
				<button onClick={DeletTaskHandler}>Delet Task</button>
			</div>
		</div>
	);
};

export const UpdateTask = () => {
	const [state, setState] = useState<any>(null);
	const [title, setTitle] = useState<string>("");
	const todolistId = "dbc1da64-525d-4dac-a03a-6f5de0fff020";
	const taskId = "817c48c5-ec6c-4471-bd47-861fd9d66ba8";

	const Properties = {
		title: title,
		description: null,
		completed: false,
		status: 0,
		priority: 1,
		startDate: null,
		deadline: null,
	};

	const UpdateTaskHandler = () => {
		todolistAPI.UpdateTask(todolistId, taskId, Properties).then((res) => {
			setState(res.data);
		});
	};

	return (
		<div>
			{JSON.stringify(state)}
			<div>
				<input
					type="text"
					placeholder="Task Title"
					value={title}
					onChange={(e) => setTitle(e.currentTarget.value)}
				/>
				<button onClick={UpdateTaskHandler}>Update Task</button>
			</div>
		</div>
	);
};
