import { startServer } from "../startServer";
import { AddressInfo } from "net";
import * as dotenv from "dotenv";

export const setup = async () => {
	dotenv.config({ path: "./.env.test" });
	const app = await startServer();
	const { port } = app.address() as AddressInfo;
	process.env.TEST_HOST = `http://127.0.0.1:${port}`;
};
