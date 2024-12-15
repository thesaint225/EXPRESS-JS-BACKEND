// errorHandling.ts
import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/errorResponse";
import mongoose from "mongoose";

const errorHandler = (
  err: Error | ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Server Error";

  //  handle specific error below
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 404;
    message = `Resource not found with id of ${err.value}`;
  }

  if (err instanceof ErrorResponse) {
    statusCode = err.statusCode;
    message = err.message;
  }

  //   log the error  for debugging
  console.log(err.stack?.red);

  // send response

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorHandler;
