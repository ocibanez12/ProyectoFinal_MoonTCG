import { randomBytes, scrypt as _scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'node:util';

const scrypt = promisify(_scrypt);

export async function hashearContrasena(contrasenaPlano) {
  if (!contrasenaPlano || typeof contrasenaPlano !== 'string') {
    throw Object.assign(new Error('Password inválida'), { status: 400 });
  }
  const sal = randomBytes(16).toString('hex');
  const buffer = await scrypt(contrasenaPlano, sal, 64);
  const hashHex = Buffer.from(buffer).toString('hex');
  return `scrypt:${sal}:${hashHex}`;
}

export async function verificarContrasena(contrasenaPlano, almacenado) {
  try {
    const [esquema, sal, hashHex] = String(almacenado).split(':');
    if (esquema !== 'scrypt' || !sal || !hashHex) return false;
    const derivado = await scrypt(contrasenaPlano, sal, 64);
    const derivadoHex = Buffer.from(derivado).toString('hex');
    return timingSafeEqual(Buffer.from(derivadoHex, 'utf8'), Buffer.from(hashHex, 'utf8'));
  } catch {
    return false;
  }
}

export function generarCadenaAleatoria(longitud = 16) {
  return randomBytes(Math.ceil(longitud / 2)).toString('hex').slice(0, longitud);
}

export function generarEnteroAleatorio(minimo, maximo) {
  const bajo = Math.ceil(minimo);
  const alto = Math.floor(maximo);
  return Math.floor(Math.random() * (alto - bajo + 1)) + bajo;
}

