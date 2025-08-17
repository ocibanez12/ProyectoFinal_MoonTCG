import { query } from '../db/pool.js';

export async function createUsuario({ nombre, apellido, email, password }) {
  const sql = `INSERT INTO usuarios (nombre, apellido, email, password)
               VALUES ($1, $2, $3, $4)
               RETURNING id, nombre, apellido, email, fecha_creacion`;
  const values = [nombre, apellido || null, email, password];
  const { rows } = await query(sql, values);
  return rows[0];
}

export async function findUsuarioByEmail(email) {
  const { rows } = await query('SELECT * FROM usuarios WHERE email = $1', [email]);
  return rows[0] || null;
}

export async function findUsuarioById(id) {
  const { rows } = await query('SELECT id, nombre, apellido, email, fecha_creacion FROM usuarios WHERE id = $1', [id]);
  return rows[0] || null;
}

export async function listUsuarios({ page = 1, pageSize = 10 } = {}) {
  const limit = Math.max(1, Math.min(100, Number(pageSize)));
  const offset = (Math.max(1, Number(page)) - 1) * limit;
  const { rows: totalRows } = await query('SELECT COUNT(*)::int AS total FROM usuarios');
  const total = totalRows[0].total;
  const { rows } = await query(
    'SELECT id, nombre, apellido, email, fecha_creacion FROM usuarios ORDER BY id LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  return { rows, total, page: Math.max(1, Number(page)), pageSize: limit };
}

export async function updateUsuario(id, data) {
  const allowed = ['nombre', 'apellido', 'email', 'password'];
  const entries = Object.entries(data).filter(([k, v]) => allowed.includes(k) && v !== undefined);
  if (entries.length === 0) return await findUsuarioById(id);

  const sets = entries.map(([k], i) => `${k} = $${i + 1}`).join(', ');
  const values = entries.map(([, v]) => v);
  values.push(id);
  const sql = `UPDATE usuarios SET ${sets} WHERE id = $${values.length} RETURNING id, nombre, apellido, email, fecha_creacion`;
  const { rows } = await query(sql, values);
  return rows[0] || null;
}

export async function deleteUsuario(id) {
  const { rowCount } = await query('DELETE FROM usuarios WHERE id = $1', [id]);
  return rowCount > 0;
}

