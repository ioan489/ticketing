import util from 'util';
import { randomBytes, scrypt } from 'crypto';

const hashPass = util.promisify(scrypt);

export default class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await hashPass(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(savedPassword: string, suppliedPassword: string) {
    const [hashedSavedPass, salt] = savedPassword.split('.');
    const buf = (await hashPass(suppliedPassword, salt, 64)) as Buffer;

    return hashedSavedPass === buf.toString('hex');
  }
}
