import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@mui/icons-material";
import { ChangeEvent, memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
	changeTaskStatusAC,
	changeTaskStatusTC,
	changeTaskTitleAC,
	changeTaskTitleTC,
	removeTaskAC,
	removeTaskTC,
} from "./state/tasks-reducer";
import { TaskStatuses } from "./api/todolist-api";
import { useAppDispatch } from "./state/store";

type TaskPropsType = {
	taskId: string;
	title: string;
	isDone: TaskStatuses;
	todolistId: string;
	removeTask: (taskId: string, todolistId: string) => void
};

export const TaskWithRedux = memo((props: TaskPropsType) => {
	const dispatch = useAppDispatch();

	const onClickHandler = useCallback(() => props.removeTask(props.taskId, props.todolistId),
		[props.taskId, props.todolistId]
	);

	const onChangeHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			let newIsDoneValue = e.currentTarget.checked;
			dispatch(
				changeTaskStatusTC(
					props.todolistId,
					props.taskId,
					newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
				)
			);
		},
		[props.taskId, props.todolistId]
	);

	const onTitleChangeHandler = useCallback(
		(newValue: string) => {
			console.log(newValue);

			dispatch(changeTaskTitleTC(props.todolistId, props.taskId, newValue));
		},
		[props.taskId, props.todolistId]
	);

	return (
		<div className={props.isDone ? "is-done" : ""}>
			<Checkbox
				checked={props.isDone === TaskStatuses.Completed}
				color="primary"
				onChange={onChangeHandler}
			/>

			<EditableSpan value={props.title} onChange={onTitleChangeHandler} />
			<IconButton onClick={onClickHandler}>
				<Delete />
			</IconButton>
		</div>
	);
});
