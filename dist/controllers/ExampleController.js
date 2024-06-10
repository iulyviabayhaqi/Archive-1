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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleController = void 0;
const routing_controllers_1 = require("routing-controllers");
let ExampleController = class ExampleController {
    /**
     * Public route example
     */
    publicExample() {
        return 'This is a public route';
    }
    /**
     * Protected route example
     */
    protectedExample() {
        return 'This is a protected route';
    }
    /**
     * Admin route example
     */
    adminExample() {
        return 'This route is for admins only';
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/public'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "publicExample", null);
__decorate([
    (0, routing_controllers_1.Get)('/protected'),
    (0, routing_controllers_1.Authorized)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "protectedExample", null);
__decorate([
    (0, routing_controllers_1.Get)('/admin'),
    (0, routing_controllers_1.Authorized)('Admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "adminExample", null);
ExampleController = __decorate([
    (0, routing_controllers_1.JsonController)('/example')
], ExampleController);
exports.ExampleController = ExampleController;
//# sourceMappingURL=ExampleController.js.map