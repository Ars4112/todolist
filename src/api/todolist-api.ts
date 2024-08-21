import axios from "axios";

const instance = axios.create({
	baseURL: "https://social-network.samuraijs.com/api/1.1",
	withCredentials: true,
	headers: {
		"API-KEY": "7306b428-7fc3-4390-a953-6d89af73c003",
	},
});

type TodolistType = {
	id: string;
	addedDate: string;
	order: number;
	title: string;
};

type ResponseType<D = {}> = {
	resultCode: number;
	messages: string[];
	fieldsErrors: FieldErrorType[];
	data: D;
};

type FieldErrorType = {
	error: string;
	field: string;
};

type TaskResponseType<D = {}> = {
	resultCode: number;
	messages: string[];
    fieldsErrors: []
	data: D;
};

export type TaskType = {
	title: string;
	description: string | null;
	completed: boolean;
	status: number;
	priority: number;
	startDate: string | null;
	deadline: string | null;
};

export const todolistAPI = {
	GetTodolists() {
		return instance.get<TodolistType[]>("/todo-lists");
	},
	CreateTodolist(title: string) {
		return instance.post<ResponseType<{ item: TodolistType }>>("/todo-lists", {
			title,
		});
	},
	DeleteTodolist(todolistId: string) {
		return instance.delete<ResponseType>(`/todo-lists/${todolistId}`);
	},
	UpdateTodolist(todolistId: string, title: string) {
		return instance.put<ResponseType<{item: TodolistType}>>(`/todo-lists/${todolistId}`, { title });
	},
	GetTask(todolistId: string) {
		return instance.get<TaskType[]>(`/todo-lists/${todolistId}/tasks`);
	},
	CreateTask(todolistId: string, title: string) {
		return instance.post<TaskResponseType>(`/todo-lists/${todolistId}/tasks`, {
			title,
		});
	},
	DeletTask(todolistId: string, taskId: string) {
		return instance.delete<TaskResponseType>(
			`/todo-lists/${todolistId}/tasks/${taskId}`
		);
	},
	UpdateTask(todolistId: string, taskId: string, Properties: TaskType) {
		return instance.put<TaskResponseType<{item: TaskType}>>(
			`/todo-lists/${todolistId}/tasks/${taskId}`,
			Properties
		);
	},
};
