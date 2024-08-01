import { Button, ButtonProps } from "@mui/material";
import {  memo } from "react";


type ButtonPropsType = ButtonProps;

export const ButtonMemo = memo(({...props}: ButtonPropsType) => {
	return (
		<Button
			variant={props.variant}
			onClick={props.onClick}
			color={props.color}
            {...props}
		>
			{props.title}
		</Button>
	);
});
