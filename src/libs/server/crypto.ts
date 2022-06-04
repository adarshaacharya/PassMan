import crypto from 'node:crypto';

class Crypto {
  encryptCredential(password: string, hashedVaultKey: string) {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv(
      'aes-256-ctr',
      Buffer.from(hashedVaultKey),
      iv,
    );
    const encryptedPassword = Buffer.concat([
      cipher.update(password),
      cipher.final(),
    ]);

    return {
      initializationVector: iv.toString('hex'),
      encryptedPassword: encryptedPassword.toString('hex'),
    };
  }

  decryptCredential(
    encryptedPassword: string,
    hashedVaultKey: string,
    initializationVector: string,
  ) {
    const ivBuffer = Buffer.from(initializationVector, 'hex');
    const encryptedPasswordBuffer = Buffer.from(encryptedPassword, 'hex');
    const decipher = crypto.createDecipheriv(
      'aes-256-ctr',
      Buffer.from(hashedVaultKey),
      ivBuffer,
    );

    const decryptedPassword = Buffer.concat([
      decipher.update(encryptedPasswordBuffer),
      decipher.final(),
    ]);

    return decryptedPassword.toString();
  }

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

  static instance: Crypto | null = null;

  static getInstance() {
    if (Crypto.instance === null) {
      Crypto.instance = new Crypto();
    }

    return Crypto.instance;
  }
}

export default Crypto;
