import http from "http";
import dotenv from "dotenv";
import {route} from "./router/router.js";

dotenv.config();

const requestListener = async (req, res) => {
    await route(req, res);
}

const server = http.createServer(requestListener);

server.listen(process.env.PORT);
