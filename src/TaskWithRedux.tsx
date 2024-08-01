import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@mui/icons-material";
import { ChangeEvent, memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
} from "./state/tasks-reducer";

type TaskPropsType = {
	taskId: string;
	title: string;
	isDone: boolean;
	todolistId: string;
};

export const TaskWithRedux = memo((props: TaskPropsType) => {
	const dispatch = useDispatch();

	const onClickHandler = useCallback(
		() => dispatch(removeTaskAC(props.taskId, props.todolistId)),
		[props.taskId, props.todolistId]
	);

	const onChangeHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			let newIsDoneValue = e.currentTarget.checked;
			dispatch(
				changeTaskStatusAC(props.taskId, newIsDoneValue, props.todolistId)
			);
		},
		[props.taskId, props.todolistId]
	);

	const onTitleChangeHandler = useCallback(
		(newValue: string) => {
			dispatch(changeTaskTitleAC(props.taskId, newValue, props.todolistId));
		},
		[props.taskId, props.todolistId]
	);

	return (
		<div className={props.isDone ? "is-done" : ""}>
			<Checkbox
				checked={props.isDone}
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
