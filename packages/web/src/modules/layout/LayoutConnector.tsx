import * as React from "react";

import { PageLayout } from "./Layout";
import { MeController } from "@abb/controller";
import { Route } from "react-router-dom";
import { Home } from "../home/homeView";
import { FollowingSnippetsConnector } from "../snippets/listFollowingSnippets/FollowingSnippetsConnector";
import { PublicSnippetsConnector } from "../snippets/listPublicSnippets/PublicSnippetsConnector";

export class LayoutConnector extends React.PureComponent {
	render() {
		return (
			<MeController>
				{user => (
					<PageLayout user={user}>
						<Route exact={true} path='/' component={Home} />
						<Route
							exact={true}
							path='/following'
							component={FollowingSnippetsConnector}
						/>
						<Route
							exact={true}
							path='/public'
							component={PublicSnippetsConnector}
						/>
					</PageLayout>
				)}
			</MeController>
		);
	}
}
