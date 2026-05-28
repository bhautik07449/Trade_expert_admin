import CryptoJS from 'crypto-js';

const SECRET_KEY = "tradexpert"; 
const KEY = CryptoJS.SHA256(SECRET_KEY);

export function decryptPayload(encryptedPayload) {
  try {
    const [ivHex, encryptedHex] = encryptedPayload.split(':');
    if (!ivHex || !encryptedHex) {
      throw new Error('Invalid encrypted format received');
    }

    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const ciphertext = CryptoJS.enc.Hex.parse(encryptedHex);

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: ciphertext },
      KEY,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedText);
  } catch (error) {
    console.error('Decryption failed:', error.message);
    throw error;
  }
}

export function encryptPayload(data) {
  try {
    const plainText = JSON.stringify(data);
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(plainText, KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const ivHex = iv.toString(CryptoJS.enc.Hex);
    const encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);

    return {
      payload: `${ivHex}:${encryptedHex}`
    };
  } catch (error) {
    console.error('Encryption failed:', error.message);
    throw error;
  }
}
