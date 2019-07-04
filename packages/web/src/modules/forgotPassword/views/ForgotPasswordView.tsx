import React from "react";
import { Form, Icon, Button } from "antd";
import { withFormik, FormikProps, Field, Form as FForm } from "formik";
import { Link } from "react-router-dom";
import { userEmailSchema } from "@abb/common";
import { InputField } from "../../shared/InputField";

interface FormValues {
	email: string;
}
interface Props {
	submit: (values: FormValues) => Promise<{ [key: string]: string } | null>;
}

class FPV extends React.PureComponent<FormikProps<FormValues> & Props> {
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
					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'>
							Send Password Reset Email
						</Button>
					</Form.Item>
					<Form.Item>
						Or <Link to='/login'>login</Link>
					</Form.Item>
				</div>
			</FForm>
		);
	}
}

export const ForgotPasswordView = withFormik<Props, FormValues>({
	validationSchema: userEmailSchema,
	mapPropsToValues: () => ({ email: "" }),
	handleSubmit: async (values, { props, setErrors }) => {
		const errors = await props.submit(values);
		if (errors) {
			setErrors(errors);
		}
	}
})(FPV);
