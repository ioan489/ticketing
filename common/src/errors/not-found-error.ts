import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  reason = 'Not found';
  statusCode = 404;

  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
