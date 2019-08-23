import React from "react";
import { Layout, Menu, Icon, Avatar, Input } from "antd";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import TopToolbar from "./Toolbar";

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;

class C extends React.PureComponent<
	RouteComponentProps & {
		children: any;
		user: { username: string; id: string };
	},
	{ collapsed: boolean; user: { username: string; id: string } }
> {
	constructor(
		props: RouteComponentProps & {
			children: any;
			user: { username: string; id: string };
		}
	) {
		super(props);
		this.state = {
			collapsed: false,
			user: {
				username: "",
				id: ""
			}
		};
	}
	onCollapse = (collapsed: boolean) => {
		this.setState({ collapsed });
	};

	componentWillReceiveProps(newProps: any) {
		this.setState({
			user: newProps.user
		});
	}

	componentDidMount() {
		this.setState({
			user: this.props.user
		});
	}

	render() {
		return (
			<Layout style={{ minHeight: "100vh" }}>
				<Sider
					collapsible
					collapsed={this.state.collapsed}
					onCollapse={this.onCollapse}>
					<Avatar
						size={this.state.collapsed ? 60 : 100}
						icon='user'
						style={{
							margin: "2rem auto",
							marginLeft: this.state.collapsed ? ".7rem" : "auto",
							display: "flow-root",
							transition: "all .4s"
						}}
					/>
					<div
						style={{
							textAlign: "center",
							color: "white",
							fontSize: "1.5rem",
							fontWeight: 600,
							paddingBottom: "1rem",
							borderBottom: "2px solid rgba(255,255,255,.2)"
						}}>
						{this.state.collapsed || this.state.user.username}
					</div>
					<Menu theme='dark' defaultSelectedKeys={["1"]} mode='inline'>
						<Menu.ItemGroup title='Menu'>
							<Menu.Item key='1'>
								<Link to='/'>
									<Icon type='home' />
									<span>Home</span>
								</Link>
							</Menu.Item>
							{/* <Menu.Item key='2'>
								<Icon type='mail' />
								<span>Notifications</span>
							</Menu.Item> */}
							{/* <Menu.Item key='9'>
								<Icon type='setting' />
								<span>Settings</span>
							</Menu.Item> */}
						</Menu.ItemGroup>
						<Menu.ItemGroup title='Snippets'>
							<Menu.Item key='3'>
								<Link to='/following'>
									<Icon type='plus-square' />
									<span>Following</span>
								</Link>
							</Menu.Item>
							<Menu.Item key='4'>
								<Link to='/public'>
									<Icon type='global' />
									<span>Public</span>
								</Link>
							</Menu.Item>
							<Menu.Item key='5'>
								<Link to='/my-snippets'>
									<Icon type='global' />
									<span>My Snippets</span>
								</Link>
							</Menu.Item>
							{/* <Menu.Item key='5'>
								<Icon type='global' />
								<span>Starred</span>
							</Menu.Item> */}
						</Menu.ItemGroup>
					</Menu>
				</Sider>
				<Header
					style={{
						position: "fixed",
						width: "100%",
						padding: "0px",
						backgroundColor: "#001529"
					}}>
					<TopToolbar history={this.props.history} />
				</Header>
				<Layout>
					<Content
						style={{
							position: "relative"
						}}>
						{this.props.children}
					</Content>
					<Footer
						style={{
							textAlign: "center",
							padding: "13px",
							backgroundColor: "rgba(0, 21, 41)",
							color: "#eee"
						}}>
						Created By @meMedia
					</Footer>
				</Layout>
			</Layout>
		);
	}
}

export const PageLayout = withRouter(C);
