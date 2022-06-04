import crypto from 'node:crypto';

class Crypto {
  encrypt(password: string, hashedVaultKey: string) {
    const iv = Buffer.from(crypto.randomBytes(16));

    const cipher = crypto.createCipheriv('aes-256-cbc', hashedVaultKey, iv);
    const encryptedPassword = Buffer.concat([
      cipher.update(password),
      cipher.final(),
    ]);

    return {
      initializationVector: iv.toString('hex'),
      encryptedPassword: encryptedPassword.toString('hex'),
    };
  }

  decrypt(
    encryptedPassword: string,
    hashedVaultKey: string,
    initializationVector: string,
  ) {
    const ivBuffer = Buffer.from(initializationVector, 'hex');
    const encryptedPasswordBuffer = Buffer.from(encryptedPassword, 'hex');

    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      hashedVaultKey,
      ivBuffer,
    );

    const decryptedPassword = Buffer.concat([
      decipher.update(encryptedPasswordBuffer),
      decipher.final(),
    ]);

    return decryptedPassword.toString();
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
