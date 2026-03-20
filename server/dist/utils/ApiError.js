export class ApiError {
    message;
    statusCode;
    constructor(message, statusCode = 422) {
        this.message = message;
        this.statusCode = statusCode;
        this.message = message;
        this.statusCode = statusCode;
    }
}
