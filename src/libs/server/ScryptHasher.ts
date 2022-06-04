import crypto from 'node:crypto';

/**
 * @description: One way hasher for passwords, replacement of bcrypt
 */
class ScryptHasher {
  private encryptPassword(password: string, salt: string) {
    return crypto.scryptSync(password, salt, 8).toString('hex');
  }

  hashSync(password: string): string {
    const salt = crypto.randomBytes(8).toString('hex');
    return this.encryptPassword(password, salt) + salt;
  }

  compareSync(password: string, hashedPassword: string) {
    const salt = hashedPassword.slice(64);
    const originalPassHash = hashedPassword.slice(0, 64);
    return originalPassHash === this.encryptPassword(password, salt);
  }

  static instance: ScryptHasher | null = null;

  static getInstance() {
    if (ScryptHasher.instance === null) {
      ScryptHasher.instance = new ScryptHasher();
    }

    return ScryptHasher.instance;
  }
}

export default ScryptHasher;
