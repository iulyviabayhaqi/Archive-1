"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Server_1 = require("./server/Server");
/**
 * Instantiates Server
 */
const server = new Server_1.Server();
/** Starts listening */
server.listen();
//# sourceMappingURL=app.js.map