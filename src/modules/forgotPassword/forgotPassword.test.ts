import * as Redis from "ioredis";
import { Connection } from "typeorm";
import { createTypeormConn } from "../../utils/createTypeormConn";
import { User } from "../../entity/User";
import { TestClient } from "../../utils/testClient";
import { createForgotPasswordLink } from "../../utils/createForgotPasswordLink";

const email = "bobert@bobert.com";
const password = "testing";
const newPassword = "newPassword";
let conn: Connection;
let userId: any;
const redis = new Redis();

beforeAll(async () => {
  conn = await createTypeormConn();
  const user = await User.create({
    email,
    password,
    confirmed: true
  }).save();
  userId = user.id;
});

afterAll(async () => {
  conn.close();
});

describe("forgot password", () => {
  test("works", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const url = await createForgotPasswordLink("", userId, redis);
    const parts = url.split("/");
    const key = parts[parts.length - 1];

    const response = await client.forgotPasswordChange(newPassword, key);
    expect(response.data).toEqual({
      forgotPasswordChange: null
    });

    expect(await client.login(email, newPassword)).toEqual({
      data: {
        login: null
      }
    });
  });
});
