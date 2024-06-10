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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const routing_controllers_1 = require("routing-controllers");
const Hash_1 = require("../utils/Hash");
/**
 * UserService class
 * @class
 */
class UserService {
    /**
     * UserService constructor,
     * instantiates prisma object
     * @constructor
     * @returns void
     */
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    /**
     * Get all users
     * @memberof UserService
     * @returns {Promise<IUser[]>}
     */
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.prisma.user.findMany({
                select: {
                    uuid: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                    isActive: true,
                    role: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            return users;
        });
    }
    /**
     * Get one user by UUID
     * @memberof UserService
     * @param {string} uuid
     * @returns {Promise<IUser | null>}
     */
    getByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: { uuid },
                select: {
                    uuid: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                    isActive: true,
                    role: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            if (!user) {
                throw new routing_controllers_1.NotFoundError(`User with UUID "${uuid}" not found`);
            }
            return user;
        });
    }
    /**
     * Get user by email
     * @memberof UserService
     * @param {string} email
     * @returns {Promise<IUser | null>}
     */
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.user.findUnique({
                    where: { email },
                });
            }
            catch (error) {
                throw new routing_controllers_1.InternalServerError(`Error: ${error}`);
            }
        });
    }
    /**
     * Create user
     * @memberof UserService
     * @param {CreateUserDto} createUserDto
     * @returns {Promise<User>}
     */
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // If email is already registered
                if (yield this.getByEmail(createUserDto.email)) {
                    console.log('Email already registered');
                    throw new routing_controllers_1.BadRequestError(`Error: Email is already registered`);
                }
                // Hash password
                createUserDto.password = yield (0, Hash_1.hash)(createUserDto.password);
                return this.prisma.user.create({
                    data: createUserDto,
                });
            }
            catch (error) {
                throw new routing_controllers_1.BadRequestError(`Error: ${error}`);
            }
        });
    }
    /**
     * Soft delete (set isActive=false) user
     * @memberof UserService
     * @param {string} uuid
     * @returns {Promise<void>}
     */
    delete(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verify if exists
                this.getByUUID(uuid);
                yield this.prisma.user.update({
                    where: { uuid },
                    data: { isActive: false },
                });
            }
            catch (error) {
                throw new routing_controllers_1.BadRequestError(`Error: ${error}`);
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map