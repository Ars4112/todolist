import { useState, KeyboardEvent, ChangeEvent } from "react";
// import { Button } from "../Button/Button";
import { IconButton, TextField, Tooltip, createSvgIcon } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

type InputPropsType = {
	addItem: (value: string) => void;
};

export function AddInputList({ addItem }: InputPropsType) {
	const [inputValue, setInputValue] = useState<string>("");
	const [errorText, setError] = useState<boolean>(false);

	const addButtonTaskHandler = () => {
		if (inputValue.trim() !== "") {
			addItem(inputValue);
			setInputValue("");
		} else {
			setError(true);
		}
	};

	const addTaskKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(false);
		if (e.key === "Enter") addButtonTaskHandler();
	};

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
		setInputValue(e.target.value);

	return (
		<div>
			<TextField
				error={errorText}
				helperText={errorText ? "Incorrect entry." : ""}
				label="Task Title"
				variant="standard"
				onKeyUp={addTaskKeyHandler}
				onChange={inputChangeHandler}
				value={inputValue}
			/>
			<Tooltip title="Add task">
				<IconButton
					aria-label="delete"
					size="small"
					onClick={addButtonTaskHandler}
					color={'primary'}
				>
					<AddBoxIcon />
				</IconButton>
			</Tooltip>
		</div>
	);
}
