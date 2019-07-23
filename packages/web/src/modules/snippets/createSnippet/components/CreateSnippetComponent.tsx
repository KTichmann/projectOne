import React from "react";
import { validSnippetSchema, SUPPORTED_LANGS } from "@abb/common";
import { withFormik, FormikProps, Field, Form as FForm } from "formik";
import { Container } from "../../../shared/InputStyles";
import { TextAreaInput } from "../../../shared/TextArea";
import { Button, Select } from "antd";
import { selectInput } from "../../../shared/selectInput";
import "./createSnippetStyles.css";
import { FlexDiv } from "./CreateSnippetStyles";
const { Option } = Select;

interface FormValues {
	content: string;
	language: string;
	visibility: string;
	tags: string[];
}

interface Props {
	submit: (values: FormValues) => Promise<{ [key: string]: string } | null>;
	test: string;
}

class CreateSnippetComponentWithoutFormik extends React.PureComponent<
	FormikProps<FormValues> & Props,
	{ tags: string[]; language: string[] }
> {
	constructor(props: FormikProps<FormValues> & Props) {
		super(props);

		this.state = {
			tags: [],
			language: []
		};
	}
	updateOptions = (e: string[], type: string) => {
		const obj: any = {};
		obj[type] = e;
		this.setState(obj);
		this.props.setFieldValue(type, e);
	};
	render() {
		return (
			<div>
				<FForm style={{ display: "flex", margin: "auto" }}>
					<Container style={{ width: "100%" }}>
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							<Field
								name='language'
								placeholder='Language'
								onChange={(e: string[]) => this.updateOptions(e, "language")}
								style={{ width: "100px" }}
								component={selectInput}>
								{[
									...SUPPORTED_LANGS.map(option => (
										<Option key={option}>{option}</Option>
									))
								]}
							</Field>
							<Field
								name='visibility'
								placeholder='Visibility'
								onChange={(e: string[]) => this.updateOptions(e, "visibility")}
								style={{ width: "100px", marginLeft: "20px" }}
								component={selectInput}>
								{[
									<Option key='public'>Public</Option>,
									<Option key='private'>Private</Option>
								]}
							</Field>
						</div>
						<Field
							name='content'
							placeholder='Create a snippet...'
							rows={5}
							style={{ width: "100%", marginBottom: "0px" }}
							component={TextAreaInput}
						/>
						<FlexDiv>
							<div style={{ flex: "15", marginRight: "50px" }}>
								<Field
									name='tags'
									placeholder='Add some tags'
									mode='tags'
									onChange={(e: string[]) => this.updateOptions(e, "tags")}
									style={{ width: "100%", border: "none" }}
									component={selectInput}>
									{[
										<Option key='Javascript'>Javascript</Option>,
										<Option key='HTML'>HTML</Option>,
										<Option key='CSS'>CSS</Option>
									]}
								</Field>
							</div>
							<div style={{ flex: "1" }}>
								<Button
									type='primary'
									htmlType='submit'
									className='login-form-button'>
									Post
								</Button>
							</div>
						</FlexDiv>
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
	handleSubmit: async (values, { props, setErrors, resetForm }) => {
		console.log(props);
		const errors = await props.submit(values);
		if (errors) {
			setErrors(errors);
		}
		resetForm();
	}
})(CreateSnippetComponentWithoutFormik);
