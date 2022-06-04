import crypto from 'node:crypto';

/**
 * @description Two way hasher for passwords, encryption and decryption
 */
class Aes256 {
  encryptSync(password: string, hashedVaultKey: string) {
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

  decryptSync({
    encryptedPassword,
    hashedVaultKey,
    initializationVector,
  }: {
    encryptedPassword: string;
    hashedVaultKey: string;
    initializationVector: string;
  }) {
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

  static instance: Aes256 | null = null;

  static getInstance() {
    if (Aes256.instance === null) {
      Aes256.instance = new Aes256();
    }

    return Aes256.instance;
  }
}

export default Aes256;
