export default class IncorrectPasswordError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'IncorrectPasswordError';

        Error.captureStackTrace(this, IncorrectPasswordError);
        Object.setPrototypeOf(this, IncorrectPasswordError.prototype);
    }
}
