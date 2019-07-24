import React from "react";
import { Form, Icon, Button } from "antd";
import { withFormik, FormikProps, Field, Form as FForm } from "formik";
import { Link } from "react-router-dom";
import { loginSchema } from "@abb/common";
import { InputField } from "../../../shared/InputField";
import { Container, Wrapper } from "../../../shared/InputStyles";

interface FormValues {
	email: string;
	password: string;
}
interface Props {
	afterSubmit: () => void;
	submit: (values: FormValues) => Promise<{ [key: string]: string } | null>;
}

class LoginViewWithoutFormik extends React.PureComponent<
	FormikProps<FormValues> & Props
> {
	render() {
		return (
			<Wrapper>
				<FForm style={{ display: "flex", margin: "auto" }}>
					<Container>
						<Field
							name='email'
							prefix={<Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />}
							placeholder='Email'
							component={InputField}
						/>
						<Field
							name='password'
							prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
							placeholder='Password'
							type='password'
							component={InputField}
						/>
						<Form.Item>
							<Link className='login-form-forgot' to='/forgot-password'>
								Forgot password
							</Link>
						</Form.Item>
						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								className='login-form-button'>
								Log In
							</Button>
						</Form.Item>
						<Form.Item>
							Or <Link to='/register'>register now!</Link>
						</Form.Item>
					</Container>
				</FForm>
			</Wrapper>
		);
	}
}

export const LoginView = withFormik<Props, FormValues>({
	validationSchema: loginSchema,
	validateOnChange: false,
	validateOnBlur: false,
	mapPropsToValues: () => ({ email: "", password: "" }),
	handleSubmit: async (values, { props, setErrors }) => {
		const errors = await props.submit(values);
		if (errors) {
			setErrors(errors);
		} else {
			props.afterSubmit();
		}
	}
})(LoginViewWithoutFormik);
