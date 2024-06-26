import { ChangeEvent } from "react";
import { FiltredType, TaskType } from "../../App";
import { Button } from "../Button/Button";
import "./Todolist.css";
import { AddInputList } from "../AddInputList/AddInputList";
import { EditableSpan } from "../EditableSpan/EditableSpan";

type PropsType = {
	title: string;
	tasks: Array<TaskType>;
	todoListId: string;
	addTask: (value: string, todoListId: string) => void;
	getValueFilter: (value: FiltredType, id: string) => void;
	changeInputRadioStatus: (
		taskId: string,
		status: boolean,
		todoListId: string
	) => void;
	filtredTasks: FiltredType;
	removeTask: (taskId: string, todoListId: string) => void;
	updateTask: (newTitle: string, todoListId: string, id: string) => void;
	updateTodoListTitle: (newTitle: string, todoListId: string)=> void
};

export const Todolist = (props: PropsType) => {
	const {
		title,
		tasks,
		addTask,
		getValueFilter,
		changeInputRadioStatus,
		filtredTasks,
		todoListId,
		removeTask,
		updateTask,
		updateTodoListTitle
	} = props;

	const checkedInputRadioHandler = (
		e: ChangeEvent<HTMLInputElement>,
		id: string
	) => {
		const newInputRadioStatus = e.currentTarget.checked;
		changeInputRadioStatus(id, newInputRadioStatus, todoListId);
	};

	const addTaskHendler = (value: string) => {
		addTask(value, todoListId);
	};

	const updateTodoListHandler = (newTitle: string)=> {
		updateTodoListTitle(newTitle, todoListId);
	}

	return (
		<div>
			<EditableSpan title={title} updateTitle={updateTodoListHandler} />
			<AddInputList addItem={addTaskHendler} />
			{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<ul>
					{tasks.map((task) => {
						const updateTaskHandler = (newTitle: string) => {
							updateTask(newTitle, todoListId, task.id);
						};
						return (
							<li className={task.isDone ? "is-done" : ""} key={task.id}>
								<input
									type="checkbox"
									checked={task.isDone}
									readOnly
									onChange={(e) => checkedInputRadioHandler(e, task.id)}
								/>
								{/* <span>{task.title}</span> */}
								<EditableSpan
									title={task.title}
									updateTitle={updateTaskHandler}
								/>
								<Button
									title={"x"}
									buttonClick={() => removeTask(task.id, todoListId)}
								/>
							</li>
						);
					})}
				</ul>
			)}
			<div>
				<Button
					className={filtredTasks === "All" ? "active-filter" : ""}
					title={"All"}
					buttonClick={() => getValueFilter("All", todoListId)}
				/>
				<Button
					className={filtredTasks === "Active" ? "active-filter" : ""}
					title={"Active"}
					buttonClick={() => getValueFilter("Active", todoListId)}
				/>
				<Button
					className={filtredTasks === "Completed" ? "active-filter" : ""}
					title={"Completed"}
					buttonClick={() => getValueFilter("Completed", todoListId)}
				/>
			</div>
		</div>
	);
};
