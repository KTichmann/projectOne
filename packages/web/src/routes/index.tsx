import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RegisterConnector } from "../modules/user/register/RegisterConnector";
import { LoginConnector } from "../modules/user/login/LoginConnector";
import { ForgotPasswordConnector } from "../modules/user/forgotPassword/ForgotPasswordConnector";
import { ChangePasswordConnector } from "../modules/user/changePassword/ChangePasswordConnector";
import { TextView } from "../modules/user/textPage/TextView";
import { CreateSnippetConnector } from "../modules/snippets/createSnippet/CreateSnippetConnector";
import { FollowingSnippetsConnector } from "../modules/snippets/listFollowingSnippets/FollowingSnippetsConnector";

export const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact={true} path='/register' component={RegisterConnector} />
			<Route exact={true} path='/login' component={LoginConnector} />
			<Route
				exact={true}
				path='/forgot-password'
				component={ForgotPasswordConnector}
			/>
			<Route
				exact={true}
				path='/change-password/:key'
				component={ChangePasswordConnector}
			/>
			<Route exact={true} path='/test' component={FollowingSnippetsConnector} />
			<Route exact={true} path='/create' component={CreateSnippetConnector} />
			<Route path='/m/' component={TextView} />
		</Switch>
	</BrowserRouter>
);
