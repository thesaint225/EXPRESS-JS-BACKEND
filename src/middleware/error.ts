import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/errorResponse";
import mongoose from "mongoose";

const errorHandler = (
  err: Error | ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default error response values
  let statusCode = 500;
  let message = "Server Error";

  // Handle Mongoose CastError (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 404;
    message = `Resource not found with id of ${err.value}`;
  }

  // Handle Custom ErrorResponse
  if (err instanceof ErrorResponse) {
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
  if (err instanceof mongoose.Error.ValidationError) {
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

export default errorHandler;
