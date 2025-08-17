import { toHateoasCollection } from '../helpers/hateoas.js';
import { addToCarrito, updateCantidad, removeFromCarrito, clearCarrito, listCarrito } from '../models/carrito.model.js';

export async function postCarrito(req, res, next) {
  try {
    const { usuario_id, producto_id, cantidad = 1 } = req.body || {};
    if (!usuario_id || !producto_id) throw Object.assign(new Error('usuario_id y producto_id requeridos'), { status: 400 });
    const item = await addToCarrito({ usuario_id, producto_id, cantidad });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function patchCarritoCantidad(req, res, next) {
  try {
    const { usuario_id, producto_id, cantidad } = req.body || {};
    if (!usuario_id || !producto_id || typeof cantidad === 'undefined') {
      throw Object.assign(new Error('usuario_id, producto_id y cantidad requeridos'), { status: 400 });
    }
    const item = await updateCantidad({ usuario_id, producto_id, cantidad });
    if (!item) throw Object.assign(new Error('Item no encontrado'), { status: 404 });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function deleteCarritoItem(req, res, next) {
  try {
    const { usuario_id, producto_id } = req.body || {};
    if (!usuario_id || !producto_id) throw Object.assign(new Error('usuario_id y producto_id requeridos'), { status: 400 });
    const removed = await removeFromCarrito({ usuario_id, producto_id });
    res.status(200).json({ removed });
  } catch (err) {
    next(err);
  }
}

export async function deleteCarrito(req, res, next) {
  try {
    const { usuario_id } = req.body || {};
    if (!usuario_id) throw Object.assign(new Error('usuario_id requerido'), { status: 400 });
    const removedCount = await clearCarrito({ usuario_id });
    res.status(200).json({ removedCount });
  } catch (err) {
    next(err);
  }
}

export async function getCarrito(req, res, next) {
  try {
    const { usuario_id, page = 1, pageSize = 20 } = req.query || {};
    if (!usuario_id) throw Object.assign(new Error('usuario_id requerido'), { status: 400 });
    const result = await listCarrito({ usuario_id, page, pageSize });
    res.json(toHateoasCollection(req, 'carrito', result.rows, result));
  } catch (err) {
    next(err);
  }
}

