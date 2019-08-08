import React from "react";
import {
	validSnippetSchema,
	SUPPORTED_LANGS,
	SUPPORTED_THEMES
} from "@abb/common";
import { withFormik, FormikProps, Field, Form as FForm } from "formik";
import { Button, Select } from "antd";
import { selectInput } from "../../../shared/selectInput";
import "./createSnippetStyles.css";
import { FlexDiv } from "./CreateSnippetStyles";
import { InputField } from "../../../shared/InputField";
import { CodeBlock } from "../../../shared/CodeBlock";
const { Option } = Select;

interface FormValues {
	content: string;
	title: string;
	language: string;
	theme: string;
	visibility: string;
	tags: string[];
}

interface Props {
	afterSubmit: (id: string) => void;
	submit: (values: FormValues) => Promise<{ [key: string]: string } | null>;
}

class CreateSnippetComponentWithoutFormik extends React.PureComponent<
	FormikProps<FormValues> & Props,
	{ tags: string[]; language: string; theme: string; content: string }
> {
	constructor(props: FormikProps<FormValues> & Props) {
		super(props);

		this.state = {
			tags: [],
			language: "html",
			theme: "github",
			content: ""
		};
	}
	updateOptions = (e: any, type: string) => {
		const obj: any = {};
		obj[type] = e;
		this.setState(obj);
		this.props.setFieldValue(type, e);
	};
	render() {
		return (
			<div
				style={{
					padding: "2rem 5rem",
					borderRadius: "5px",
					boxShadow: "0px 0px 1px 1px rgba(0,0,0,.2)"
				}}>
				<FForm style={{ display: "flex", margin: "auto" }}>
					<div style={{ width: "100%" }}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginLeft: "1.5rem",
								marginBottom: "1rem"
							}}>
							<div style={{ width: "30%" }}>
								<Field
									name='title'
									placeholder='Title'
									style={{
										width: "100%",
										marginBottom: "0px"
									}}
									component={InputField}
								/>
							</div>
							<div style={{ display: "flex" }}>
								<Field
									name='theme'
									placeholder='Theme'
									onChange={(e: string) => {
										this.updateOptions(e, "theme");
										this.setState({ theme: e });
									}}
									style={{ width: "100px", margin: "0px 20px" }}
									component={selectInput}>
									{[
										...SUPPORTED_THEMES.map(option => (
											<Option key={option}>{option}</Option>
										))
									]}
								</Field>
								<Field
									name='language'
									placeholder='Language'
									onChange={(e: string) => {
										this.updateOptions(e, "language");
										this.setState({ language: e });
									}}
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
									onChange={(e: string[]) =>
										this.updateOptions(e, "visibility")
									}
									style={{ width: "100px", marginLeft: "20px" }}
									component={selectInput}>
									{[
										<Option key='public'>Public</Option>,
										<Option key='private'>Private</Option>
									]}
								</Field>
							</div>
						</div>
						<Field
							name='content'
							placeholder='Create a snippet...'
							value={this.state.content}
							language={this.state.language}
							theme={this.state.theme}
							readOnly={false}
							style={{
								width: "100%",
								boxShadow: "1px 1px 1px 1px rgba(0,0,0,.3)"
							}}
							onChange={(e: string) => {
								this.updateOptions(e, "content");
							}}
							component={CodeBlock}
						/>
						<FlexDiv style={{ marginTop: "20px" }}>
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
					</div>
				</FForm>
			</div>
		);
	}
}

export const CreateSnippetComponent = withFormik<Props, FormValues>({
	validationSchema: validSnippetSchema,
	mapPropsToValues: () => ({
		content: "",
		language: "html",
		title: "",
		visibility: "public",
		theme: "darcula",
		tags: []
	}),
	handleSubmit: async (values, { props, setErrors }) => {
		if (values.content.length > 500) {
			setErrors({
				title: "Snippet content cannot be longer than 500 characters"
			});
		} else {
			console.log("values: ", values);
			const snippet = await props.submit(values);
			if (snippet) {
				props.afterSubmit(snippet.id);
			}
		}
	}
})(CreateSnippetComponentWithoutFormik);
