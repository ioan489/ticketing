import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  reason = 'Database connection error';
  statusCode = 500;

  constructor() {
    super('Database connection error');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeError() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
