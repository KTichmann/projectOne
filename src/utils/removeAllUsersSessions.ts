import { Redis } from "ioredis";
import { redisSessionPrefix, userSessionIdPrefix } from "../constants";

export const removeAllUsersSessions = async (userId: string, redis: Redis) => {
	const sessionIds = await redis.lrange(
		`${userSessionIdPrefix}${userId}`,
		0,
		-1
	);

	const promises = [];
	for (const sessionId of sessionIds) {
		promises.push(redis.del(`${redisSessionPrefix}${sessionId}`));
	}

	await Promise.all(promises);
};
