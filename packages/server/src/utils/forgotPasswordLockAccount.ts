import { removeAllUsersSessions } from "./removeAllUsersSessions";
import { Redis } from "ioredis";
import { User } from "../entity/User";

export const forgotPasswordLockAccount = async (
  userId: string,
  redis: Redis
) => {
  // make sure user can't log in anymore
  await User.update({ id: userId }, { forgotPasswordLocked: true });
  // remove all sessions
  await removeAllUsersSessions(userId, redis);
};
