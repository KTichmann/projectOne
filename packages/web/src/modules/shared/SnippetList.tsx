import React from "react";
import { Snippet } from "../snippets/sharedComponents/Snippet";
let i = 0;
export const SnippetList = (props: any) => {
  return (
    <div>
      {props.values.map((val: any) => (
        <div key={val.id} style={{ margin: "10px", marginBottom: "50px" }}>
          <Snippet
            key={val.id}
            value={val.content}
            title={val.title}
            avatar={"test"}
            language={val.language}
            tags={val.tags}
            theme={"test"}
            snapId={val.id}
            username={val.user}
            count={12}
          />
        </div>
      ))}
    </div>
  );
};
