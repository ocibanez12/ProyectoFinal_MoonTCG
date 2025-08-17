import { toHateoasCollection, toHateoasItem } from '../helpers/hateoas.js';
import {
  createProducto,
  findProductoById,
  listProductos,
  updateProducto,
  deleteProducto,
} from '../models/productos.model.js';

export async function postProducto(req, res, next) {
  try {
    const { nombre, precio, tipo, imagen_url, usuario_id } = req.body || {};
    if (!nombre || !precio || !tipo || !usuario_id) {
      throw Object.assign(new Error('nombre, precio, tipo y usuario_id son requeridos'), { status: 400 });
    }
    const created = await createProducto({ nombre, precio, tipo, imagen_url, usuario_id });
    res.status(201).json(toHateoasItem(req, 'productos', created));
  } catch (err) {
    next(err);
  }
}

export async function getProductos(req, res, next) {
  try {
    const { page = 1, pageSize = 10, tipo, usuario_id } = req.query;
    const result = await listProductos({ page, pageSize, tipo, usuario_id });
    res.json(toHateoasCollection(req, 'productos', result.rows, result));
  } catch (err) {
    next(err);
  }
}

export async function getProductoById(req, res, next) {
  try {
    const { id } = req.params;
    const found = await findProductoById(id);
    if (!found) throw Object.assign(new Error('Producto no encontrado'), { status: 404 });
    res.json(toHateoasItem(req, 'productos', found));
  } catch (err) {
    next(err);
  }
}

export async function patchProducto(req, res, next) {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    const updated = await updateProducto(id, data);
    if (!updated) throw Object.assign(new Error('Producto no encontrado'), { status: 404 });
    res.json(toHateoasItem(req, 'productos', updated));
  } catch (err) {
    next(err);
  }
}

export async function deleteProductoById(req, res, next) {
  try {
    const { id } = req.params;
    const ok = await deleteProducto(id);
    if (!ok) throw Object.assign(new Error('Producto no encontrado'), { status: 404 });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

