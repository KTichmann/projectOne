import React, { Component } from "react";
import { AboutScreen } from "../AboutScreen/index";
import { createDrawerNavigator } from "react-navigation-drawer";
import { HomeScreen } from "./HomeScreen";
import { SideBar } from "../SideBar/SideBar.ts/SideBar";

export const HomeScreenRouter = createDrawerNavigator(
	{
		Home: { screen: HomeScreen },
		About: { screen: AboutScreen }
	},
	{
		contentComponent: props => <SideBar {...props} />
	}
);
export default HomeScreenRouter;
