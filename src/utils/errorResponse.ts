export default class ErrorResponse extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message), // Call  the parent class(error) constructor
      (this.statusCode = statusCode);
  }
}
