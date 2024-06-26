import "./Button.css"

type ButtonPropsType = {
	title: string
	buttonClick: ()=> void;
	className?: string
}



export const Button = ({title, buttonClick, className}: ButtonPropsType) => {

	const onClickHandler = ()=> {
		buttonClick()
	}
	return (
		<button className={className} onClick={onClickHandler}>{title}</button>
	)
}
