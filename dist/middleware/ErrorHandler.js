"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const routing_controllers_1 = require("routing-controllers");
/**
 * ErrorHandler middleware class
 * @class
 * @decorator `Middleware({ type: "after" })`
 */
let ErrorHandler = class ErrorHandler {
    /**
     * Error handler method
     * @param {any} error
     * @param {Request} request
     * @param {Response} response
     * @param {any} next
     * @returns {any}
     */
    error(error, request, response, next) {
        if (response.headersSent) {
            return;
        }
        response.status(error.httpCode || 500).json(error);
    }
};
ErrorHandler = __decorate([
    (0, routing_controllers_1.Middleware)({ type: 'after' })
], ErrorHandler);
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map
