"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const services_1 = require("../services/");
const CreateUserDto_1 = require("../dtos/CreateUserDto");
/**
 * UserController class
 * @class
 */
let UserController = class UserController {
    /**
     * Instantiates UserService
     * @constructor
     * @returns void
     */
    constructor() {
        this.userService = new services_1.UserService();
    }
    /**
     * Get all users
     * @memberof UserController
     * @returns {Promise<IUser>}
     */
    index() {
        return this.userService.index();
    }
    /**
     * Get one user by uuid
     * @memberof UserController
     * @param {string} uuid
     * @returns {Promise<IUser | null>}
     */
    getByUUID(uuid) {
        return this.userService.getByUUID(uuid);
    }
    /**
     * Create new user
     * @memberof UserController
     * @param {CreateUserDto} data
     * @returns {Promise<User>}
     */
    create(data) {
        return this.userService.create(data);
    }
    /**
     * Soft delete user
     * @memberof UserController
     * @param {string} uuid
     * @returns {Promise<void>}
     */
    delete(uuid) {
        return this.userService.delete(uuid);
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "index", null);
__decorate([
    (0, routing_controllers_1.Get)('/:uuid'),
    __param(0, (0, routing_controllers_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getByUUID", null);
__decorate([
    (0, routing_controllers_1.Post)('/'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, routing_controllers_1.Delete)('/:uuid'),
    (0, routing_controllers_1.OnUndefined)(204),
    __param(0, (0, routing_controllers_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, routing_controllers_1.JsonController)('/user'),
    __metadata("design:paramtypes", [])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map