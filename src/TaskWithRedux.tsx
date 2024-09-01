import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@mui/icons-material";
import { ChangeEvent, memo, useCallback } from "react";
import { changeTaskStatusTC, changeTaskTitleTC } from "./state/tasks-reducer";
import { TaskStatuses } from "./api/todolist-api";
import { useAppDispatch } from "./state/store";
import { RequestStatusType } from "./state/app-reducer";
import CircularProgress from '@mui/material/CircularProgress';

type TaskPropsType = {
	taskId: string;
	title: string;
	isDone: TaskStatuses;
	todolistId: string;
	removeTask: (taskId: string, todolistId: string) => void;
	entityStatus: RequestStatusType;
	editMode: boolean | undefined;
};

export const TaskWithRedux = memo((props: TaskPropsType) => {
	const dispatch = useAppDispatch();

	const onClickHandler = useCallback(
		() => props.removeTask(props.taskId, props.todolistId),
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
				disabled={props.entityStatus === "loading"}
			/>

			<EditableSpan
				value={props.title}
				onChange={onTitleChangeHandler}
				entityStatus={props.entityStatus}
			/>
			<IconButton
				onClick={onClickHandler}
				disabled={props.entityStatus === "loading"}
			>
				{!props.editMode ? <Delete /> :
				<CircularProgress  size={24}/>}
			</IconButton>
			
			
		</div>
	);
});
