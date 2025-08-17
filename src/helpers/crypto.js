import { randomBytes, scrypt as _scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'node:util';

const scrypt = promisify(_scrypt);

export async function hashPassword(plainPassword) {
  if (!plainPassword || typeof plainPassword !== 'string') {
    throw Object.assign(new Error('Password inválida'), { status: 400 });
  }
  const salt = randomBytes(16).toString('hex');
  const buffer = await scrypt(plainPassword, salt, 64);
  const hashHex = Buffer.from(buffer).toString('hex');
  return `scrypt:${salt}:${hashHex}`;
}

export async function verifyPassword(plainPassword, stored) {
  try {
    const [scheme, salt, hashHex] = String(stored).split(':');
    if (scheme !== 'scrypt' || !salt || !hashHex) return false;
    const derived = await scrypt(plainPassword, salt, 64);
    const derivedHex = Buffer.from(derived).toString('hex');
    return timingSafeEqual(Buffer.from(derivedHex, 'utf8'), Buffer.from(hashHex, 'utf8'));
  } catch {
    return false;
  }
}

export function generateRandomString(length = 16) {
  return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

export function generateRandomInt(min, max) {
  const low = Math.ceil(min);
  const high = Math.floor(max);
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

