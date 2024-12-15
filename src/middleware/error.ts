// errorHandling.ts
import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/errorResponse";

const errorHandler = (
  err: Error | ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Server Error";

  //   check if it's an instance of ErrorResponse to use the custom
  // status code and message
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
