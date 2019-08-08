import React from "react";
import AceEditor from "react-ace";
import brace from "brace";

import "brace/ext/language_tools";
import "brace/mode/javascript";
import "brace/mode/json";
import "brace/mode/html";
import "brace/mode/typescript";
import "brace/mode/jsx";
import "brace/mode/css";
import "brace/mode/scss";
import "brace/mode/php";
import "brace/mode/ruby";
import "brace/theme/github";
import "brace/theme/ambiance";
import "brace/theme/chaos";
import "brace/theme/chrome";
import "brace/theme/clouds";
import "brace/theme/cobalt";
import "brace/theme/dawn";
import "brace/theme/dracula";
import "brace/theme/dreamweaver";
import "brace/theme/eclipse";
import "brace/theme/gob";
import "brace/theme/kuroir";
import "brace/theme/pastel_on_dark";
import "brace/theme/textmate";
import "brace/theme/terminal";

export const CodeBlock = (props: {
	value: string;
	language: string;
	theme: string;
	readOnly: boolean;
	onChange?: () => any;
}) => {
	return (
		<AceEditor
			style={{ borderRadius: "8px" }}
			value={props.value}
			mode={props.language}
			theme={props.theme}
			onChange={props.onChange}
			fontSize={16}
			maxLines={50}
			width='100%'
			showPrintMargin={true}
			showGutter={true}
			highlightActiveLine={true}
			readOnly={props.readOnly}
			setOptions={{
				enableBasicAutocompletion: true,
				enableLiveAutocompletion: true,
				enableSnippets: false,
				showLineNumbers: true,
				tabSize: 2
			}}
		/>
	);
};
