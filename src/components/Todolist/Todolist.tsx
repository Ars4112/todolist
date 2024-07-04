import { ChangeEvent } from "react";
import { FiltredType, TaskType } from "../../App";
import { AddInputList } from "../AddInputList/AddInputList";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { IconButton, List, ListItem, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

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
	updateTodoListTitle: (newTitle: string, todoListId: string) => void;
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
		updateTodoListTitle,
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

	const updateTodoListHandler = (newTitle: string) => {
		updateTodoListTitle(newTitle, todoListId);
	};

	return (
		<div>
			<h3>
				<EditableSpan title={title} updateTitle={updateTodoListHandler} />
			</h3>

			<AddInputList addItem={addTaskHendler} />
			{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<List>
					{tasks.map((task) => {
						const updateTaskHandler = (newTitle: string) => {
							updateTask(newTitle, todoListId, task.id);
						};
						return (
							<ListItem key={task.id} sx={getListItemSx(task.isDone)}>
								<div>
									<Checkbox
										defaultChecked
										checked={task.isDone}
										readOnly
										onChange={(e) => checkedInputRadioHandler(e, task.id)}
									/>
									{/* <span>{task.title}</span> */}
									<EditableSpan
										title={task.title}
										updateTitle={updateTaskHandler}
									/>
								</div>
								<Tooltip title="Delete task">
									<IconButton
										aria-label="delete"
										size="small"
										onClick={() => removeTask(task.id, todoListId)}
									>
										<DeleteIcon fontSize="inherit" />
									</IconButton>
								</Tooltip>
							</ListItem>
						);
					})}
				</List>
			)}
			<Box sx={filterButtonsContainerSx}>
				<Button
					variant={filtredTasks === "All" ? "contained" : "outlined"}
					title={"All"}
					onClick={() => getValueFilter("All", todoListId)}
				>All</Button>
				<Button
					variant={filtredTasks === "Active" ? "contained" : "outlined"}
					title={"Active"}
					onClick={() => getValueFilter("Active", todoListId)}
				>Active</Button>
				<Button
					variant={filtredTasks === "Completed" ? "contained" : "outlined"}
					title={"Completed"}
					onClick={() => getValueFilter("Completed", todoListId)}
				>Completed</Button>
			</Box>
		</div>
	);
};
