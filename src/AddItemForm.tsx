import IconButton from "@mui/material/IconButton/IconButton";
import TextField from "@mui/material/TextField/TextField";
import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import { AddBox } from "@mui/icons-material";

import {  RequestStatusType } from "./state/app-reducer";

type AddItemFormPropsType = {
	addItem: (title: string) => void;
	entityStatus?: RequestStatusType
	status?: RequestStatusType
};

export const AddItemForm = memo((props: AddItemFormPropsType) => {

	let [title, setTitle] = useState("");
	let [error, setError] = useState<string | null>(null);

	const addItem = () => {
		if (title.trim() !== "") {
			props.addItem(title);
			setTitle("");
		} else {
			setError("Title is required");
		}
	};

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	};

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) setError(null);
		if (e.key === "Enter") {
			addItem();
		}
	};

	const disabledButton = error !== null || props.entityStatus === "loading" || props.status === "loading"
	const disabledInput = props.entityStatus === "loading" || props.status === "loading"

	return (
		<div style={{marginBottom: "10px"}}>
			<TextField
				variant="outlined"
				error={!!error}
				value={title}
				onChange={onChangeHandler}
				onKeyUp={onKeyPressHandler}
				label="Title"
				helperText={error}
				disabled={disabledInput}
			/>
			<IconButton color="primary" onClick={addItem} disabled={disabledButton}>
				<AddBox />
			</IconButton>
		</div>
	);
});
