import * as React from "react";

import { PageLayout } from "./Layout";
import { MeController } from "@abb/controller";
import { Route } from "react-router-dom";
import { Home } from "../home/homeView";

export class LayoutConnector extends React.PureComponent {
	render() {
		return (
			<MeController>
				{user => (
					<PageLayout user={user}>
						<Route exact={true} path='/' component={Home} />
					</PageLayout>
				)}
			</MeController>
		);
	}
}
