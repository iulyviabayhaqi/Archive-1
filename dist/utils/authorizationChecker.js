"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheck = void 0;
const routing_controllers_1 = require("routing-controllers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("../services");
/**
 * Authorization checker
 * @param {Action} action
 * @param {string[]} roles
 * @returns {Promise<boolean>}
 */
const authCheck = (action, roles) => __awaiter(void 0, void 0, void 0, function* () {
    // Get token from headers
    const authorization = action.request.headers['authorization'];
    const token = authorization.replace('Bearer ', '');
    if (!token) {
        throw new routing_controllers_1.UnauthorizedError('Missing token');
    }
    // Verify jwt and get userId from payload
    const { userId } = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || '');
    // Search user by userId
    const userService = new services_1.UserService();
    const user = yield userService.getByUUID(userId);
    // User not found
    if (!user) {
        throw new routing_controllers_1.UnauthorizedError('Invalid user');
    }
    // User is not active
    if (!user.isActive) {
        throw new routing_controllers_1.UnauthorizedError('Blocked user');
    }
    // Active user and no role required
    if (user && !roles.length)
        return true;
    // Active user and role admited
    if (user && roles.find((role) => user.role.name === role))
        return true;
    // Not authorized
    throw new routing_controllers_1.UnauthorizedError("You're not authorized");
});
exports.authCheck = authCheck;
//# sourceMappingURL=AuthorizationChecker.js.map
