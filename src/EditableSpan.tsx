import React, {ChangeEvent, memo, useCallback, useState} from 'react';
import {TextField} from "@mui/material";
import { RequestStatusType } from './state/app-reducer';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    entityStatus:RequestStatusType
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
   
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = useCallback(() => {
        setEditMode(true);
        setTitle(props.value);
    }, [props.value])

    const activateViewMode = useCallback(() => {
        setEditMode(false);
        props.onChange(title);      
    }, [props.onChange, title])
 
    const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }, [])

    return editMode && props.entityStatus !== "loading"
        ?    <TextField variant="outlined"
                        value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
})
