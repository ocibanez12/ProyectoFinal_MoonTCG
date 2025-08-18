import { agregarAlCarrito, actualizarCantidad, eliminarDelCarrito, vaciarCarrito, listarCarrito } from '../models/carrito.model.js';

export async function crear(req, res, next) {
  try {
    const { usuario_id, producto_id, cantidad = 1 } = req.body || {};
    if (!usuario_id || !producto_id) throw Object.assign(new Error('usuario_id y producto_id requeridos'), { status: 400 });
    const item = await agregarAlCarrito({ usuario_id, producto_id, cantidad });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function actualizarCantidadCtrl(req, res, next) {
  try {
    const { usuario_id, producto_id, cantidad } = req.body || {};
    if (!usuario_id || !producto_id || typeof cantidad === 'undefined') {
      throw Object.assign(new Error('usuario_id, producto_id y cantidad requeridos'), { status: 400 });
    }
    const item = await actualizarCantidad({ usuario_id, producto_id, cantidad });
    if (!item) throw Object.assign(new Error('Item no encontrado'), { status: 404 });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function eliminarItem(req, res, next) {
  try {
    const { usuario_id, producto_id } = req.body || {};
    if (!usuario_id || !producto_id) throw Object.assign(new Error('usuario_id y producto_id requeridos'), { status: 400 });
    const eliminado = await eliminarDelCarrito({ usuario_id, producto_id });
    res.status(200).json({ removed: eliminado });
  } catch (err) {
    next(err);
  }
}

export async function eliminar(req, res, next) {
  try {
    const { usuario_id } = req.body || {};
    if (!usuario_id) throw Object.assign(new Error('usuario_id requerido'), { status: 400 });
    const cantidadEliminada = await vaciarCarrito({ usuario_id });
    res.status(200).json({ removedCount: cantidadEliminada });
  } catch (err) {
    next(err);
  }
}

export async function listar(req, res, next) {
  try {
    const { usuario_id, page = 1, pageSize = 20 } = req.query || {};
    if (!usuario_id) throw Object.assign(new Error('usuario_id requerido'), { status: 400 });
    const resultado = await listarCarrito({ usuario_id, pagina: page, tamanoPagina: pageSize });
    res.json({ total: resultado.total, pagina: resultado.page, tamanoPagina: resultado.pageSize, items: resultado.rows });
  } catch (err) {
    next(err);
  }
}

