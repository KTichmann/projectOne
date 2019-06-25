import { Redis } from "ioredis";

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
    redis: Redis;
    url: string;
    session: Session;
    req: Express.Request;
  },
  info: any
) => any;
export type Resolver = (
  parent: any,
  args: any,
  context: {
    redis: Redis;
    url: string;
    session: Session;
    req: Express.Request;
  },
  info: any
) => any;
