"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, req, res, next) => {
    // Default error response values
    let statusCode = 500;
    let message = "Server Error";
    // Handle Mongoose CastError (invalid ObjectId)
    if (err instanceof mongoose_1.default.Error.CastError) {
        statusCode = 404;
        message = `Resource not found with id of ${err.value}`;
    }
    // Handle Custom ErrorResponse
    if (err instanceof errorResponse_1.default) {
        statusCode = err.statusCode || 500;
        message = err.message || "Server Error";
    }
    // Log the error (include stack for debugging)
    console.error(err.stack || err);
    // Handle Mongoose duplicate key error
    if ("code" in err && err.code === 11000) {
        statusCode = 400; // Bad request
        message = "Duplicate field value entered.";
    }
    // Handle Mongoose validation errors
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        message = Object.values(err.errors)
            .map((val) => val.message) // Explicitly extract `val.message`
            .join(", "); // Combine messages into a single string
        statusCode = 400; // Validation errors are client-side issues
    }
    // Final error response
    res.status(statusCode).json({
        success: false,
        error: message,
    });
};
exports.default = errorHandler;
