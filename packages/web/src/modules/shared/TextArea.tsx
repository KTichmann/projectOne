import * as React from "react";
import { FieldProps } from "formik";
import { Form, Input } from "antd";

export const TextArea: React.SFC<
	FieldProps<any> & { prefix: React.ReactNode }
> = ({ field, form: { touched, errors }, ...props }) => {
	const errMessage = touched[field.name] && errors[field.name];
	return (
		<Form.Item
			help={errMessage}
			validateStatus={errMessage ? "error" : undefined}>
			<Input size='large' {...field} {...props} />
		</Form.Item>
	);
};
