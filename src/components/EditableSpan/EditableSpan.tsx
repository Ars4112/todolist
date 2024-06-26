
import { ChangeEvent, useState } from "react";

type PropsType = {
	title: string;
    updateTitle: (newTitle: string)=> void
};

export function EditableSpan({ title, updateTitle}: PropsType) {
	const [editMode, setEditMode] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>(title)

    const changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        setEditTitle(e.currentTarget.value)
        updateTitle(editTitle)
    }

	return editMode ? <input onChange={changeInputValueHandler} value={editTitle} onBlur={()=> setEditMode(!editMode)} autoFocus/> : <span onDoubleClick={()=>setEditMode(!editMode)
    }>{title}</span>;
}
