import { query } from '../db/pool.js';

export async function createProducto({ nombre, precio, tipo, imagen_url, usuario_id }) {
  const sql = `INSERT INTO productos (nombre, precio, tipo, imagen_url, usuario_id)
               VALUES ($1, $2, $3, $4, $5)
               RETURNING id, nombre, precio, tipo, imagen_url, usuario_id`;
  const values = [nombre, precio, tipo, imagen_url || null, usuario_id];
  const { rows } = await query(sql, values);
  return rows[0];
}

export async function findProductoById(id) {
  const { rows } = await query('SELECT * FROM productos WHERE id = $1', [id]);
  return rows[0] || null;
}

export async function listProductos({ page = 1, pageSize = 10, tipo, usuario_id } = {}) {
  const limit = Math.max(1, Math.min(100, Number(pageSize)));
  const offset = (Math.max(1, Number(page)) - 1) * limit;
  const where = [];
  const params = [];
  if (tipo) {
    params.push(tipo);
    where.push(`tipo = $${params.length}`);
  }
  if (usuario_id) {
    params.push(usuario_id);
    where.push(`usuario_id = $${params.length}`);
  }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const totalQuery = `SELECT COUNT(*)::int AS total FROM productos ${whereSql}`;
  const { rows: totalRows } = await query(totalQuery, params);
  const total = totalRows[0].total;
  params.push(limit, offset);
  const dataQuery = `SELECT * FROM productos ${whereSql} ORDER BY id DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;
  const { rows } = await query(dataQuery, params);
  return { rows, total, page: Math.max(1, Number(page)), pageSize: limit };
}

export async function updateProducto(id, data) {
  const allowed = ['nombre', 'precio', 'tipo', 'imagen_url'];
  const entries = Object.entries(data).filter(([k, v]) => allowed.includes(k) && v !== undefined);
  if (entries.length === 0) return await findProductoById(id);
  const sets = entries.map(([k], i) => `${k} = $${i + 1}`).join(', ');
  const values = entries.map(([, v]) => v);
  values.push(id);
  const sql = `UPDATE productos SET ${sets} WHERE id = $${values.length} RETURNING *`;
  const { rows } = await query(sql, values);
  return rows[0] || null;
}

export async function deleteProducto(id) {
  const { rowCount } = await query('DELETE FROM productos WHERE id = $1', [id]);
  return rowCount > 0;
}

