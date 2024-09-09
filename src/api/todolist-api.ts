import axios, { AxiosResponse } from "axios";

const instance = axios.create({
	baseURL: "https://social-network.samuraijs.com/api/1.1",
	withCredentials: true,
	headers: {
		"API-KEY": "0b12e645-6778-4d27-a51e-1dc41cbc8073",
	},
});

export const authAPI = {
	me() {
		return instance.get<ResponseType<UserType>>("/auth/me");
	},
	login(values: LoginParamsType) {
		return instance.post<
			ResponseType<{ userId: number }>,
			AxiosResponse<ResponseType<{ userId: number }>>
		>("/auth/login", values);
	},

	logOut() {
		return instance.delete<ResponseType>(`/auth/login`);
	}
};

export const todolistAPI = {
	GetTodolists() {
		return instance.get<TodolistDomainType[]>("/todo-lists");
	},
	CreateTodolist(title: string) {
		return instance.post<ResponseType<{ item: TodolistDomainType }>>(
			"/todo-lists",
			{
				title,
			}
		);
	},
	DeleteTodolist(todolistId: string) {
		return instance.delete<ResponseType>(`/todo-lists/${todolistId}`);
	},
	UpdateTodolist(todolistId: string, title: string) {
		return instance.put<ResponseType<{ item: TodolistDomainType }>>(
			`/todo-lists/${todolistId}`,
			{ title }
		);
	},
	GetTask(todolistId: string) {
		return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
	},
	CreateTask(todolistId: string, title: string) {
		return instance.post<ResponseType<{ item: TaskType }>>(
			`/todo-lists/${todolistId}/tasks`,
			{
				title,
			}
		);
	},
	DeletTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseType>(
			`todo-lists/${todolistId}/tasks/${taskId}`
		);
	},
	UpdateTask(
		todolistId: string,
		taskId: string,
		Properties: UpdateTaskModelType
	) {
		return instance.put<ResponseType<{ item: TaskType }>>(
			`/todo-lists/${todolistId}/tasks/${taskId}`,
			Properties
		);
	},
};

type UserType = {
	id: number;
	email: string;
	login: string;
};

export type LoginParamsType = {
	email: string;
	password: string;
	rememberMe?: boolean;
};

export type TodolistDomainType = {
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

export type UpdateTaskModelType = {
	title: string;
	description: string;
	status: TaskStatuses;
	priority: TaskPriorities;
	startDate: string;
	deadline: string;
};
export type TaskType = {
	description: string;
	title: string;
	status: TaskStatuses;
	priority: TaskPriorities;
	startDate: string;
	deadline: string;
	id: string;
	todoListId: string;
	order: number;
	addedDate: string;
	editMode?: boolean;
};

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3,
}

export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4,
}
type GetTasksResponse = {
	error: string | null;
	totalCount: number;
	items: TaskType[];
};
