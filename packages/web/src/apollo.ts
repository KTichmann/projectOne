import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import {
	IntrospectionFragmentMatcher,
	InMemoryCache
} from "apollo-cache-inmemory";
import introspectionQueryResultData from "./fragmentTypes.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData
});

export const client = new ApolloClient({
	link: new HttpLink({
		uri: process.env.REACT_APP_SERVER_URL,
		credentials: "include"
	}),
	cache: new InMemoryCache({ fragmentMatcher })
});
