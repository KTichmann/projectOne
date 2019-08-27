import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import {
	fade,
	makeStyles,
	MuiThemeProvider,
	createMuiTheme
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block"
		}
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto"
		}
	},
	searchIcon: {
		width: theme.spacing(7),
		height: "100%",
		position: "absolute",
		zIndex: 103,
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	logOut: {
		backgroundColor: "white",
		margin: "5px 0",
		lineHeight: "40px",
		borderRadius: "10px",
		padding: "0px 20px",
		marginLeft: "20px"
	},
	inputRoot: {
		color: "inherit"
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: 120,
			"&:focus": {
				width: 200
			}
		}
	}
}));

const mainTheme = createMuiTheme({
	palette: {
		primary: { main: "#001529" }
	}
});

export default function TopToolbar(props: { history: any; user: any }) {
	const classes = useStyles();
	const [value, setValue] = useState("");

	return (
		<MuiThemeProvider theme={mainTheme}>
			<div className={classes.root}>
				<AppBar position='static' color='primary'>
					<Toolbar>
						<Typography className={classes.title} variant='h6' noWrap />
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon
									onClick={e => {
										return value.length > 0
											? props.history.push(`/search/${value}`)
											: false;
									}}
								/>
							</div>
							<InputBase
								fullWidth
								placeholder='Search…'
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput
								}}
								value={value}
								onChange={e => setValue(e.target.value)}
								inputProps={{ "aria-label": "search" }}
								onKeyUp={e => {
									if (e.keyCode === 13 && value.length > 0) {
										props.history.push(`/search/${value}`);
									}
								}}
							/>
						</div>
						<div className={classes.logOut}>
							<Button>
								{props.user ? (
									<a href='/log-out'>Log Out</a>
								) : (
									<a href='/login'>Log In</a>
								)}
							</Button>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		</MuiThemeProvider>
	);
}
