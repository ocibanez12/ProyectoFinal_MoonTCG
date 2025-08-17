import { query } from '../db/pool.js';

export async function addToCarrito({ usuario_id, producto_id, cantidad = 1 }) {
  const sql = `INSERT INTO carrito (usuario_id, producto_id, cantidad)
               VALUES ($1, $2, $3)
               ON CONFLICT (usuario_id, producto_id) DO UPDATE SET cantidad = carrito.cantidad + EXCLUDED.cantidad
               RETURNING id, usuario_id, producto_id, cantidad`;
  const { rows } = await query(sql, [usuario_id, producto_id, cantidad]);
  return rows[0];
}

export async function updateCantidad({ usuario_id, producto_id, cantidad }) {
  const { rows } = await query(
    'UPDATE carrito SET cantidad = $3 WHERE usuario_id = $1 AND producto_id = $2 RETURNING id, usuario_id, producto_id, cantidad',
    [usuario_id, producto_id, cantidad]
  );
  return rows[0] || null;
}

export async function removeFromCarrito({ usuario_id, producto_id }) {
  const { rowCount } = await query('DELETE FROM carrito WHERE usuario_id = $1 AND producto_id = $2', [usuario_id, producto_id]);
  return rowCount > 0;
}

export async function clearCarrito({ usuario_id }) {
  const { rowCount } = await query('DELETE FROM carrito WHERE usuario_id = $1', [usuario_id]);
  return rowCount;
}

export async function listCarrito({ usuario_id, page = 1, pageSize = 20 }) {
  const limit = Math.max(1, Math.min(100, Number(pageSize)));
  const offset = (Math.max(1, Number(page)) - 1) * limit;
  const totalQuery = 'SELECT COUNT(*)::int AS total FROM carrito WHERE usuario_id = $1';
  const { rows: totalRows } = await query(totalQuery, [usuario_id]);
  const total = totalRows[0].total;
  const dataQuery = `SELECT c.id, c.usuario_id, c.producto_id, c.cantidad,
                            p.nombre, p.precio, p.tipo, p.imagen_url
                     FROM carrito c
                     JOIN productos p ON p.id = c.producto_id
                     WHERE c.usuario_id = $1
                     ORDER BY c.id DESC
                     LIMIT $2 OFFSET $3`;
  const { rows } = await query(dataQuery, [usuario_id, limit, offset]);
  return { rows, total, page: Math.max(1, Number(page)), pageSize: limit };
}

