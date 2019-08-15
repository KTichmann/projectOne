import React, { useState } from "react";
import { Form, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";

export const Editor = (props: {
  submit: any;
  snippetId: string;
  updateCommentList: any;
}) => {
  const [value, setvalue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (value === "") {
      return;
    }
    setSubmitting(true);
    const response = await props.submit({
      content: value,
      snippetId: props.snippetId
    });
    if (response.id) {
      props.updateCommentList(response);
    }
    setvalue("");
    setSubmitting(false);
  };

  return (
    <div>
      <Form.Item>
        <TextArea
          rows={4}
          onChange={e => setvalue(e.target.value)}
          value={value}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={handleSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </div>
  );
};
