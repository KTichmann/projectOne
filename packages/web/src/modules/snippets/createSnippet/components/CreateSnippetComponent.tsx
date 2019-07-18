import React from "react";
import { validSnippetSchema } from "@abb/common";
import { withFormik, FormikProps, Field, Form as FForm } from "formik";
import { Container } from "../../../shared/InputStyles";
import { TextArea } from "../../../shared/TextArea";

interface FormValues {
	content: string;
	language: string;
	visibility: string;
	tags: string[];
}

interface Props {
	submit: (values: FormValues) => Promise<{ [key: string]: string } | null>;
}

class CreateSnippetComponentWithoutFormik extends React.PureComponent<
	FormikProps<FormValues> & Props
> {
	render() {
		return (
			<div>
				<FForm style={{ display: "flex", margin: "auto" }}>
					<Container>
						<Field
							name='content'
							placeholder="let's see some text..."
							component={TextArea}
						/>
					</Container>
				</FForm>
			</div>
		);
	}
}

export const CreateSnippetComponent = withFormik<Props, FormValues>({
	validationSchema: validSnippetSchema,
	mapPropsToValues: () => ({
		content: "",
		language: "javascript",
		visibility: "public",
		tags: []
	}),
	handleSubmit: async (values, { props, setErrors }) => {
		const errors = await props.submit(values);
		if (errors) {
			setErrors(errors);
		}
	}
})(CreateSnippetComponentWithoutFormik);
