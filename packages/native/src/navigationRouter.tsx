import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { SideBar } from "./components/SideBar";
import { HomeScreen } from "./screens/HomeScreen";
import { AboutScreen } from "./screens/AboutScreen";

const HomeScreenRouter = createDrawerNavigator(
	{
		Home: { screen: HomeScreen },
		About: { screen: AboutScreen },
		Testing: { screen: HomeScreen }
	},
	{
		contentComponent: SideBar
	}
);
export default createAppContainer(HomeScreenRouter);
