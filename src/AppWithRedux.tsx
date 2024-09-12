import "./App.css";
import {
	AppBar,
	Button,
	CircularProgress,
	Container,
	LinearProgress,
	Toolbar,
	Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import { Menu } from "@mui/icons-material";

import { ErrorSnackbar } from "./ErrorSnackbar";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "./state/store";
import { RequestStatusType } from "./state/app-reducer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { initializeAppTC, logOutTC } from "./state/auth-reducer";

export function AppWithRedux() {
	const status = useSelector<AppRootStateType, RequestStatusType>(
		(state) => state.app.status
	);
	const isLoggedIn = useSelector<AppRootStateType, boolean>(
		(state) => state.auth.isLoggedIn
	);
	const isInitialized = useSelector<AppRootStateType, boolean>(
		(state) => state.app.isInitialized
	);
	const dispatch = useAppDispatch();

	const logOutHandler = () => {
		dispatch(logOutTC());
	};

	useEffect(() => {
		dispatch(initializeAppTC());
	}, []);

	if (!isInitialized) {
		return (
			<div
				style={{
					position: "fixed",
					top: "30%",
					textAlign: "center",
					width: "100%",
				}}
			>
				<CircularProgress />
			</div>
		);
	}
	return (
		<div className="App">
			<ErrorSnackbar />
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<Menu />
					</IconButton>
					<Typography variant="h6">News</Typography>
					{isLoggedIn && (
						<Button color="inherit" onClick={logOutHandler}>
							LogOut
						</Button>
					)}
				</Toolbar>
			</AppBar>
			{status === "loading" && <LinearProgress />}
			<Container fixed>
				<Outlet />
			</Container>
		</div>
	);
}
