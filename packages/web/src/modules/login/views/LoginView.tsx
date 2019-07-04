import React from "react";
import { Form, Icon, Button } from "antd";
import { withFormik, FormikProps, Field, Form as FForm } from "formik";
import { Link } from "react-router-dom";
import { loginSchema } from "@abb/common";
import { InputField } from "../../shared/InputField";

interface FormValues {
	email: string;
	password: string;
}
interface Props {
	submit: (values: FormValues) => Promise<{ [key: string]: string } | null>;
}

class LoginViewWithoutFormik extends React.PureComponent<
	FormikProps<FormValues> & Props
> {
	render() {
		return (
			<FForm style={{ display: "flex", margin: "auto" }}>
				<div className='login-form' style={{ width: 400, margin: "auto" }}>
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
				</div>
			</FForm>
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
		}
	}
})(LoginViewWithoutFormik);
