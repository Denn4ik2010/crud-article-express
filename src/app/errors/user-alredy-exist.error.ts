export default class AlreadyExistsError extends Error {
    constructor(message: string) {
        super(message);

        this.name = 'UserAlreadyExistError';
        Error.captureStackTrace(this, AlreadyExistsError);
        Object.setPrototypeOf(this, AlreadyExistsError.prototype);
    }
}
