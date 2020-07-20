import { Request, Response, NextFunction } from 'express';
interface Payload {
    id: string;
    email: string;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: Payload;
            session?: any;
        }
    }
}
export declare const currentUser: (req: Request, res: Response, next: NextFunction) => void;
export {};
