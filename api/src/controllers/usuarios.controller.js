import { toHateoasCollection, toHateoasItem } from '../helpers/hateoas.js';
import { hashPassword, verifyPassword } from '../helpers/crypto.js';
import {
  createUsuario,
  findUsuarioByEmail,
  findUsuarioById,
  listUsuarios,
  updateUsuario,
  deleteUsuario,
} from '../models/usuarios.model.js';

export async function postUsuario(req, res, next) {
  try {
    const { nombre, apellido, email, password } = req.body || {};
    if (!nombre || !email || !password) {
      throw Object.assign(new Error('nombre, email y password son requeridos'), { status: 400 });
    }
    const existing = await findUsuarioByEmail(email);
    if (existing) {
      throw Object.assign(new Error('Email ya registrado'), { status: 409 });
    }
    const hashed = await hashPassword(password);
    const created = await createUsuario({ nombre, apellido, email, password: hashed });
    res.status(201).json(toHateoasItem(req, 'usuarios', created));
  } catch (err) {
    next(err);
  }
}

export async function getUsuarios(req, res, next) {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const result = await listUsuarios({ page, pageSize });
    res.json(toHateoasCollection(req, 'usuarios', result.rows, result));
  } catch (err) {
    next(err);
  }
}

export async function getUsuarioById(req, res, next) {
  try {
    const { id } = req.params;
    const found = await findUsuarioById(id);
    if (!found) throw Object.assign(new Error('Usuario no encontrado'), { status: 404 });
    res.json(toHateoasItem(req, 'usuarios', found));
  } catch (err) {
    next(err);
  }
}

export async function patchUsuario(req, res, next) {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (data.password) data.password = await hashPassword(String(data.password));
    const updated = await updateUsuario(id, data);
    if (!updated) throw Object.assign(new Error('Usuario no encontrado'), { status: 404 });
    res.json(toHateoasItem(req, 'usuarios', updated));
  } catch (err) {
    next(err);
  }
}

export async function deleteUsuarioById(req, res, next) {
  try {
    const { id } = req.params;
    const ok = await deleteUsuario(id);
    if (!ok) throw Object.assign(new Error('Usuario no encontrado'), { status: 404 });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function loginUsuario(req, res, next) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) throw Object.assign(new Error('email y password requeridos'), { status: 400 });
    const user = await findUsuarioByEmail(email);
    if (!user) throw Object.assign(new Error('Credenciales inválidas'), { status: 401 });
    const ok = await verifyPassword(password, user.password);
    if (!ok) throw Object.assign(new Error('Credenciales inválidas'), { status: 401 });
    const safe = { id: user.id, nombre: user.nombre, apellido: user.apellido, email: user.email, fecha_creacion: user.fecha_creacion };
    res.json({ usuario: toHateoasItem(req, 'usuarios', safe) });
  } catch (err) {
    next(err);
  }
}

