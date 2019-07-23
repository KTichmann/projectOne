import React from "react";
import { validSnippetSchema, SUPPORTED_LANGS } from "@abb/common";
import { withFormik, FormikProps, Field, Form as FForm } from "formik";
import { Container } from "../../../shared/InputStyles";
import { TextAreaInput } from "../../../shared/TextArea";
import { Button, Select } from "antd";
import { selectInput } from "../../../shared/selectInput";
import "./createSnippetStyles.css";
import { FlexDiv } from "./CreateSnippetStyles";
import { InputField } from "../../../shared/InputField";
import { CodeMirror } from "../../../shared/CodeMirror";
const { Option } = Select;

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
  FormikProps<FormValues> & Props,
  { tags: string[]; language: string }
> {
  constructor(props: FormikProps<FormValues> & Props) {
    super(props);

    this.state = {
      tags: [],
      language: "html"
    };
  }
  updateOptions = (e: any, type: string) => {
    console.log(e);
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
                name="title"
                placeholder="Title"
                style={{ width: "100px", marginBottom: "0px" }}
                component={InputField}
              />
              <Field
                name="language"
                placeholder="Language"
                onChange={(e: string) => {
                  this.updateOptions(e, "language");
                  this.setState({ language: e });
                }}
                style={{ width: "100px" }}
                component={selectInput}
              >
                {[
                  ...SUPPORTED_LANGS.map(option => (
                    <Option key={option}>{option}</Option>
                  ))
                ]}
              </Field>
              <Field
                name="visibility"
                placeholder="Visibility"
                onChange={(e: string[]) => this.updateOptions(e, "visibility")}
                style={{ width: "100px", marginLeft: "20px" }}
                component={selectInput}
              >
                {[
                  <Option key="public">Public</Option>,
                  <Option key="private">Private</Option>
                ]}
              </Field>
            </div>
            <Field
              name="content"
              placeholder="Create a snippet..."
              rows={5}
              value=""
              language={this.state.language}
              theme="darcula"
              readOnly={false}
              style={{ width: "100%", marginBottom: "0px" }}
              onChange={(_: any, __: any, e: string) => {
                console.log("changing");
                this.updateOptions(e, "content");
              }}
              component={CodeMirror}
            />
            <FlexDiv>
              <div style={{ flex: "15", marginRight: "50px" }}>
                <Field
                  name="tags"
                  placeholder="Add some tags"
                  mode="tags"
                  onChange={(e: string[]) => this.updateOptions(e, "tags")}
                  style={{ width: "100%", border: "none" }}
                  component={selectInput}
                >
                  {[
                    <Option key="Javascript">Javascript</Option>,
                    <Option key="HTML">HTML</Option>,
                    <Option key="CSS">CSS</Option>
                  ]}
                </Field>
              </div>
              <div style={{ flex: "1" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
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
    title: "",
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
