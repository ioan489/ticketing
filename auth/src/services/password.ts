import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const asyncScrypt = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await asyncScrypt(password, salt, 64)) as Buffer;
    return `${hash.toString('hex')}.${salt}`;
  }

  static async comparePasswords(
    suppliedPassword: string,
    savedPassword: string
  ) {
    const [hashedPassword, salt] = savedPassword.split('.');
    const buf = (await asyncScrypt(suppliedPassword, salt, 64)) as Buffer;

    return hashedPassword === buf.toString('hex');
  }
}
