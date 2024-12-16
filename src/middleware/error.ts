// errorHandling.ts
import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/errorResponse";
import mongoose from "mongoose";
import { error } from "console";

const errorHandler = (
  err: Error | ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // default value
  let statusCode = 500;
  let message = "Server Error";

  // Handle Mongoose CastError (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 404;
    message = `Resource not found with id of ${err.value}`;
  }

  // Handle Custom ErrorResponse
  if (err instanceof ErrorResponse) {
    statusCode = err.statusCode;
    message = err.message;
  }
  //   log the error  for debugging
  console.log(err);

  //   Mongoose duplicate key
  if ("code" in err && err.code === 11000) {
    statusCode = 400; //bad request
    message = "Duplicate field value entered ";
  }
  //   Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors).map((val) => {
      val.message;
    });
  }

  // send response

  res.status(statusCode || 500).json({
    success: false,
    error: err.message || "Server Error",
  });
};

export default errorHandler;
