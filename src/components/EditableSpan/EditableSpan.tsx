import { ChangeEvent, useState } from "react";

type PropsType = {
	title: string;
	updateTitle: (newTitle: string) => void;
};

export function EditableSpan({ title, updateTitle }: PropsType) {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [editTitle, setEditTitle] = useState<string>(title);

	const changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setEditTitle(e.currentTarget.value);
		
	};

	const changeInputHandler = () => {
        setEditMode(!editMode)
        if(editMode) updateTitle(editTitle);
    };

	return editMode ? (
		<input
			onChange={changeInputValueHandler}
			value={editTitle}
			onBlur={changeInputHandler}
			autoFocus
		/>
	) : (
		<span onDoubleClick={changeInputHandler}>{title}</span>
	);
}
