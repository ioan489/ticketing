import { CustomError } from './custom-error';
export declare class DatabaseConnectionError extends CustomError {
    reason: string;
    statusCode: number;
    constructor();
    serializeError(): {
        message: string;
    }[];
}
