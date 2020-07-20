import { CustomError } from './custom-error';
export declare class NotFoundError extends CustomError {
    reason: string;
    statusCode: number;
    constructor();
    serializeError(): {
        message: string;
    }[];
}
