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
import { LoginConnector } from "../user/login/LoginConnector";

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
							component={() => (
								<div style={{ padding: "100px" }}>
									<PublicSnippetsConnector />
								</div>
							)}
						/>
						{user.id
							? [
									<Route
										key='1'
										exact={true}
										path='/following'
										component={(props: any) => (
											<div style={{ padding: "100px" }}>
												<FollowingSnippetsConnector {...props} />
											</div>
										)}
									/>,
									<Route
										key='2'
										exact={true}
										path='/snippet/:snippetId'
										component={(props: any) => (
											<div style={{ padding: "100px" }}>
												<SnippetView {...props} />
											</div>
										)}
									/>,
									<Route
										key='3'
										exact={true}
										path='/user/:username'
										component={(props: any) => (
											<div style={{ padding: "100px" }}>
												<UserSnippetView {...props} />
											</div>
										)}
									/>,
									<Route
										key='4'
										exact={true}
										path='/my-snippets'
										component={(props: any) => (
											<div style={{ padding: "100px" }}>
												<MySnippetsConnector {...props} />
											</div>
										)}
									/>,
									<Route
										key='5'
										exact={true}
										path='/search/:query'
										component={(props: any) => (
											<div style={{ padding: "100px" }}>
												<SearchSnippetsView {...props} />
											</div>
										)}
									/>
							  ]
							: [
									<Route
										key='1'
										exact={true}
										path='/following'
										component={LoginConnector}
									/>,
									<Route
										key='2'
										exact={true}
										path='/snippet/:snippetId'
										component={LoginConnector}
									/>,
									<Route
										key='3'
										exact={true}
										path='/user/:username'
										component={LoginConnector}
									/>,
									<Route
										key='4'
										exact={true}
										path='/my-snippets'
										component={LoginConnector}
									/>,
									<Route
										key='5'
										exact={true}
										path='/search/:query'
										component={LoginConnector}
									/>
							  ]}
					</PageLayout>
				)}
			</MeController>
		);
	}
}
