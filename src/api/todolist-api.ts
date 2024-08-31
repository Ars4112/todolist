import axios from "axios";

const instance = axios.create({
	baseURL: "https://social-network.samuraijs.com/api/1.1",
	withCredentials: true,
	headers: {
		"API-KEY": "f3fe212b-71b2-4ada-83bf-13e78cd3e8af",
	},
});

export const todolistAPI = {
	GetTodolists() {
		return instance.get<TodolistDomainType[]>("/todo-lists");
	},
	CreateTodolist(title: string) {
		return instance.post<ResponseType<{ item: TodolistDomainType }>>("/todo-lists", {
			title,
		});
	},
	DeleteTodolist(todolistId: string) {
		return instance.delete<ResponseType>(`/todo-lists/${todolistId}`);
	},
	UpdateTodolist(todolistId: string, title: string) {
		return instance.put<ResponseType<{item: TodolistDomainType}>>(`/todo-lists/${todolistId}`, { title });
	},
	GetTask(todolistId: string) {
		return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
	},
	CreateTask(todolistId: string, title: string) {
		return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {
			title,
		});
	},
	DeletTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
	},
	UpdateTask(todolistId: string, taskId: string, Properties: UpdateTaskModelType) {
		return instance.put<ResponseType<{item: TaskType}>>(
			`/todo-lists/${todolistId}/tasks/${taskId}`,
			Properties
		);
	},
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
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}