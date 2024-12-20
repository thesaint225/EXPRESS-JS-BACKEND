"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message), // Call  the parent class(error) constructor
            (this.statusCode = statusCode);
    }
}
exports.default = ErrorResponse;
