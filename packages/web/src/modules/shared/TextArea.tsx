import * as React from "react";
import { FieldProps } from "formik";
import { Form, Input } from "antd";
const { TextArea } = Input;

export const TextAreaInput: React.SFC<FieldProps<any>> = ({
	field,
	form: { touched, errors },
	...props
}) => {
	const errMessage = touched[field.name] && errors[field.name];
	return (
		<Form.Item
			help={errMessage}
			validateStatus={errMessage ? "error" : undefined}>
			<TextArea {...field} {...props} />
		</Form.Item>
	);
};
