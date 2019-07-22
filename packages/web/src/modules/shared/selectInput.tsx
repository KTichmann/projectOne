import React from "react";
import { Select, Form } from "antd";

export const selectInput: React.SFC<any> = ({ field, form, ...props }) => {
	return (
		<Form.Item>
			<Select
				// {...field}
				{...props}
				onChange={e => {
					field.onChange(e);
					props.onChange(e);
				}}>
				{props.children}
			</Select>
		</Form.Item>
	);
};
