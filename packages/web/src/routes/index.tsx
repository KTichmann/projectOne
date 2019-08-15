import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RegisterConnector } from "../modules/user/register/RegisterConnector";
import { LoginConnector } from "../modules/user/login/LoginConnector";
import { ForgotPasswordConnector } from "../modules/user/forgotPassword/ForgotPasswordConnector";
import { ChangePasswordConnector } from "../modules/user/changePassword/ChangePasswordConnector";
import { TextView } from "../modules/user/textPage/TextView";
import { LayoutConnector } from "../modules/layout/LayoutConnector";
import { CommentListComponent } from "../modules/comments/commentList/CommentListComponent";

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
			<Route exact={true} path='/comments' component={CommentListComponent} />
			<Route path='/m/' component={TextView} />
			<LayoutConnector />
		</Switch>
	</BrowserRouter>
);
