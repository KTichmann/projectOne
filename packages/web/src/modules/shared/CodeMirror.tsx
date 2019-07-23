import React from "react";
import { UnControlled as CM } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/python/python";
import "codemirror/mode/php/php";
import "codemirror/mode/ruby/ruby";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/darcula.css";

export const CodeMirror = (props: {
  value: string;
  language: string;
  theme: string;
  readOnly: boolean;
  onChange?: () => any;
}) => {
  return (
    <CM
      value={props.value}
      options={{
        mode: props.language,
        theme: props.theme,
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        readOnly: props.readOnly
      }}
      onChange={props.onChange}
    />
  );
};
