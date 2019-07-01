import { Db } from "mongodb";

export interface ResolverMap {
	[key: string]: {
		[key: string]: Resolver;
	};
}

export interface Session extends Express.Session {
	userId?: string;
}

export type GraphQLMiddlewareFunc = (
	resolver: Resolver,
	parent: any,
	args: any,
	context: {
		url: string;
		session: Session;
		req: Express.Request;
		mongo: Db;
	},
	info: any
) => any;
export type Resolver = (
	parent: any,
	args: any,
	context: {
		mongo: Db;
		url: string;
		session: Session;
		req: Express.Request;
	},
	info: any
) => any;
