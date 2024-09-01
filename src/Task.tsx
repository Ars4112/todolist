// import { Checkbox, IconButton } from "@mui/material";
// import { EditableSpan } from "./EditableSpan";
// import { Delete } from "@mui/icons-material";
// import { ChangeEvent, memo, useCallback } from "react";

// type TaskPropsType = {
// 	taskId: string;
// 	title: string;
// 	isDone: boolean;
// 	todolistId: string;
// 	removeTask: (taskId: string, todolistId: string) => void;
// 	changeTaskStatus: (
// 		taskId: string,
// 		isDone: boolean,
// 		todolistId: string
// 	) => void;
// 	changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
// };

// export const Task = memo((props: TaskPropsType) => {
// 	const onClickHandler = useCallback(() => props.removeTask(props.taskId, props.todolistId), [props.removeTask, props.taskId, props.todolistId]);
// 	const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
// 		let newIsDoneValue = e.currentTarget.checked;
// 		props.changeTaskStatus(props.taskId, newIsDoneValue, props.todolistId);
// 	}, [props.changeTaskStatus, props.taskId, props.todolistId]);
// 	const onTitleChangeHandler = useCallback((newValue: string) => {
// 		props.changeTaskTitle(props.taskId, newValue, props.todolistId);
// 	}, [props.changeTaskTitle,props.taskId, props.todolistId]);
// 	return (
// 		<div className={props.isDone ? "is-done" : ""}>
// 			<Checkbox
// 				checked={props.isDone}
// 				color="primary"
// 				onChange={onChangeHandler}
// 			/>

// 			<EditableSpan value={props.title} onChange={onTitleChangeHandler} />
// 			<IconButton onClick={onClickHandler}>
// 				<Delete />
// 			</IconButton>
// 		</div>
// 	);
// });
