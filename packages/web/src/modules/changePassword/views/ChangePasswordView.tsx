import React from "react";
import { Form, Icon, Button } from "antd";
import { withFormik, FormikProps, Field, Form as FForm } from "formik";
import { Link } from "react-router-dom";
import { userPasswordSchema } from "@abb/common";
import { InputField } from "../../shared/InputField";

interface FormValues {
	password: string;
}
interface Props {
	submit: (values: FormValues) => Promise<{ [key: string]: string } | null>;
}

class CPV extends React.PureComponent<FormikProps<FormValues> & Props> {
	render() {
		return (
			<FForm style={{ display: "flex", margin: "auto" }}>
				<div className='login-form' style={{ width: 400, margin: "auto" }}>
					<Field
						name='password'
						prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
						placeholder='New Password'
						type='password'
						component={InputField}
					/>
					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'>
							Update your password
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

export const ChangePasswordView = withFormik<Props, FormValues>({
	validationSchema: userPasswordSchema,
	mapPropsToValues: () => ({ password: "" }),
	handleSubmit: async (values, { props, setErrors }) => {
		const errors = await props.submit(values);
		if (errors) {
			setErrors(errors);
			console.log(errors);
		}
	}
})(CPV);
