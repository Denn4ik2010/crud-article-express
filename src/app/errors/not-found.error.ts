export default class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        Error.captureStackTrace(this, NotFoundError);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
