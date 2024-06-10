"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const routing_controllers_1 = require("routing-controllers");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const ErrorHandler_1 = require("../middleware/ErrorHandler");
const AuthorizationChecker_1 = require("../utils/AuthorizationChecker");
dotenv_1.default.config();
/**
 * Server class
 * @class
 */
class Server {
    /**
     * Server constructor
     * initializes express server
     * and sets listening port
     * @constructor
     * @returns void
     */
    constructor() {
        this.app = (0, routing_controllers_1.createExpressServer)({
            cors: true,
            defaultErrorHandler: false,
            middlewares: [ErrorHandler_1.ErrorHandler],
            authorizationChecker: AuthorizationChecker_1.authCheck,
            controllers: [path_1.default.join(__dirname + '/../controllers/*.js')],
        });
        this.port = Number(process.env.PORT) || 3000;
    }
    /**
     * Listen method
     * @memberof Server
     * @returns void
     */
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map
