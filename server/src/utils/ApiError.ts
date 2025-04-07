export class ApiError {
  constructor(public message: string, public statusCode = 422) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
