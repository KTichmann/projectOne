import { User } from "../../entity/User";

import {
  duplicateEmail,
  emailNotLongEnough,
  invalidEmail,
  passwordNotLongEnough
} from "./errorMessages";
import { createTypeormConn } from "../../utils/createTypeormConn";
import { Connection } from "typeorm";
import { TestClient } from "../../utils/testClient";

const email = "testing@test.com";
const password = "testing";

let conn: Connection;
beforeAll(async () => {
  conn = await createTypeormConn();
});
afterAll(async () => {
  conn.close();
});

describe("register user", () => {
  test("user registers successfully", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.register(email, password);

    expect(response.data).toEqual({ register: null });

    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);

    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });

  test("duplicate email responds with correct error", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response2: any = await client.register(email, password);
    expect(response2.data.register).toHaveLength(1);
    expect(response2.data.register[0]).toEqual({
      path: "email",
      message: duplicateEmail
    });
  });

  test("invalid email responds with correct error", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response3: any = await client.register("e", password);
    expect(response3.data).toEqual({
      register: [
        {
          path: "email",
          message: emailNotLongEnough
        },
        {
          path: "email",
          message: invalidEmail
        }
      ]
    });
  });

  test("invalid password responds with correct error", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response4: any = await client.register(email, "t");
    expect(response4.data).toEqual({
      register: [
        {
          path: "password",
          message: passwordNotLongEnough
        }
      ]
    });
  });

  test("invalid password and email responds with correct error", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    const response4: any = await client.register("e", "t");
    expect(response4.data).toEqual({
      register: [
        {
          path: "email",
          message: "email must be at least 3 characters"
        },
        {
          path: "email",
          message: "email must be a valid email"
        },
        {
          path: "password",
          message: "password must be at least 3 characters"
        }
      ]
    });
  });
});
