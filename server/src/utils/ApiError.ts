export class ApiError {
  constructor(public message: string, public statusCode = 409) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
