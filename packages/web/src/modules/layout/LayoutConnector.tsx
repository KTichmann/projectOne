import * as React from "react";

import { PageLayout } from "./Layout";
import { MeController } from "@abb/controller";
import { Route, RouteComponentProps } from "react-router-dom";
import { Home } from "../home/homeView";
import { FollowingSnippetsConnector } from "../snippets/listFollowingSnippets/FollowingSnippetsConnector";
import { PublicSnippetsConnector } from "../snippets/listPublicSnippets/PublicSnippetsConnector";
import { SnippetView } from "../snippets/displaySnippet/snippetView";
import { UserSnippetView } from "../snippets/listUserSnippets/UserSnippetView";
import { MySnippetsConnector } from "../snippets/listMySnippets/MySnippetsConnector";
import { SearchSnippetsView } from "../snippets/searchSnippets/SearchSnippetsView";
import { LoginView } from "../user/login/views/LoginView";

export class LayoutConnector extends React.PureComponent {
	render() {
		return (
			<MeController>
				{user => (
					<PageLayout user={user}>
						<Route exact={true} path='/' component={Home} />
						<Route
							exact={true}
							path='/public'
							component={PublicSnippetsConnector}
						/>
						{user.id ? (
							[
								<Route
									key='1'
									exact={true}
									path='/following'
									component={FollowingSnippetsConnector}
								/>,
								<Route
									key='2'
									exact={true}
									path='/snippet/:snippetId'
									component={SnippetView}
								/>,
								<Route
									key='3'
									exact={true}
									path='/user/:username'
									component={UserSnippetView}
								/>,
								<Route
									key='4'
									exact={true}
									path='/my-snippets'
									component={MySnippetsConnector}
								/>,
								<Route
									key='5'
									exact={true}
									path='/search/:query'
									component={SearchSnippetsView}
								/>
							]
						) : (
							<Route path='/' component={LoginView} />
						)}
					</PageLayout>
				)}
			</MeController>
		);
	}
}
