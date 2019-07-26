import React from "react";
import { Layout, Menu, Icon, Avatar, Input } from "antd";
import { Link } from "react-router-dom";

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;

export class PageLayout extends React.PureComponent<
	{ children: any; user: { username: string; id: string } },
	{ collapsed: boolean; user: { username: string; id: string } }
> {
	constructor(props: {
		children: any;
		user: { username: string; id: string };
	}) {
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
						style={{ margin: "2rem auto", display: "flow-root" }}
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
							<Menu.Item key='2'>
								<Icon type='mail' />
								<span>Notifications</span>
							</Menu.Item>
							<Menu.Item key='9'>
								<Icon type='setting' />
								<span>Settings</span>
							</Menu.Item>
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
								<Icon type='global' />
								<span>Starred</span>
							</Menu.Item>
						</Menu.ItemGroup>
					</Menu>
				</Sider>
				<Layout>
					<Header
						style={{
							background: "white",
							padding: "3rem"
						}}>
						<Search
							placeholder='Search'
							enterButton
							size='large'
							onSearch={value => console.log(value)}
						/>
					</Header>
					<Content style={{ margin: "0 16px" }}>{this.props.children}</Content>
					<Footer style={{ textAlign: "center" }}>Footer Af</Footer>
				</Layout>
			</Layout>
		);
	}
}
