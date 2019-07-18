import React from "react";
import { Form, Icon, Button } from "antd";
import { withFormik, FormikProps, Field, Form as FForm } from "formik";
import { Link } from "react-router-dom";
import { userEmailSchema } from "@abb/common";
import { InputField } from "../../../shared/InputField";
import { Container, Wrapper } from "../../../shared/InputStyles";

interface FormValues {
	email: string;
}
interface Props {
	afterSubmit: () => void;
	submit: (values: FormValues) => Promise<{ [key: string]: string } | null>;
}

class FPV extends React.PureComponent<FormikProps<FormValues> & Props> {
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
					</Container>
				</FForm>
			</Wrapper>
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
		} else {
			props.afterSubmit();
		}
	}
})(FPV);
