import React from "react";
import { Snippet } from "./Snippet";

export const Snippet2 = () => (
	<Snippet
		title='Titleing!'
		avatar='testingImage'
		language='htmlmixed'
		tags={["live", "laugh", "love"]}
		value='<div>testing</div>'
		theme='github'
		count={100}
		snapId='100'
	/>
);
