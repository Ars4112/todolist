import { useState, KeyboardEvent, ChangeEvent } from "react";
import { Button } from "../Button/Button";

type InputPropsType = {
	addItem: (value: string) => void;
};

export function AddInputList({addItem}: InputPropsType) {
	const [inputValue, setInputValue] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const addButtonTaskHandler = () => {
		if (inputValue.trim() !== "") {
			addItem(inputValue);
			setInputValue("");
		} else {
			setError("Title is required");
		}
	};

	const addTaskKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null);
		if (e.key === "Enter") addButtonTaskHandler();
	};

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
		setInputValue(e.target.value);

	return (
		<div>
			<input
				className={error ? "error" : ""}
				value={inputValue}
				onChange={inputChangeHandler}
				onKeyUp={addTaskKeyHandler}
			/>
			<Button title={"+"} buttonClick={addButtonTaskHandler} />
			{error && <div className="error-message">{error}</div>}
		</div>
	);
}
