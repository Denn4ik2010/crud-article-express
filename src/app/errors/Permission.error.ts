export default class PermissionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PermissionError';
        Error.captureStackTrace(this, PermissionError);
        Object.setPrototypeOf(this, PermissionError.prototype);
    }
}
