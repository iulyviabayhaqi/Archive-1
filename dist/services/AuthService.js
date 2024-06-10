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
exports.AuthService = void 0;
const routing_controllers_1 = require("routing-controllers");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const services_1 = require("../services");
const GenerateJWT_1 = require("../utils/GenerateJWT");
/**
 * AuthService class
 * @class
 */
class AuthService {
    /**
     * Login method
     * @param {LoginDto} loginDto
     * @returns {Promise<{}>}
     */
    login(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = loginDto;
                // Find user by email and get their id, email and password
                const userService = new services_1.UserService();
                const user = yield userService.getByEmail(email);
                // User doesn't exist
                if (!user) {
                    throw new routing_controllers_1.UnauthorizedError('Invalid credentials');
                }
                // Verify password hash
                const verifyPassword = bcryptjs_1.default.compareSync(password, user.password);
                // Wrong password
                if (!verifyPassword) {
                    throw new routing_controllers_1.UnauthorizedError('Invalid credentials');
                }
                // Generate JWT
                const token = yield (0, GenerateJWT_1.generateJWT)(user.uuid);
                return {
                    ok: 1,
                    token: `Bearer ${token}`,
                };
            }
            catch (error) {
                throw new routing_controllers_1.InternalServerError(`Error ${error}`);
            }
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map
