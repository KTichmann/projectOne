import React from "react";
import { SnippetList } from "../../../shared/SnippetList";

export const FollowingSnippetsView = (props: any) => (
  <div>
    <SnippetList value={props.value} />
  </div>
);
