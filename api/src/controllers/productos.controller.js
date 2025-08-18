import { aHateoasColeccion, aHateoasRecurso } from '../helpers/hateoas.js';
import {
  crearProducto,
  buscarProductoPorId,
  listarProductos,
  actualizarProducto,
  eliminarProducto,
} from '../models/productos.model.js';

export async function crearProductoCtrl(req, res, next) {
  try {
    const { nombre, precio, tipo, imagen_url, usuario_id } = req.body || {};
    if (!nombre || !precio || !tipo || !usuario_id) {
      throw Object.assign(new Error('nombre, precio, tipo y usuario_id son requeridos'), { status: 400 });
    }
    const creado = await crearProducto({ nombre, precio, tipo, imagen_url, usuario_id });
    res.status(201).json(aHateoasRecurso(req, 'productos', creado));
  } catch (err) {
    next(err);
  }
}

export async function obtenerProductosCtrl(req, res, next) {
  try {
    const { page = 1, pageSize = 10, tipo, usuario_id } = req.query;
    const resultado = await listarProductos({ pagina: page, tamanoPagina: pageSize, tipo, usuario_id });
    res.json(aHateoasColeccion(req, 'productos', resultado.rows, resultado));
  } catch (err) {
    next(err);
  }
}

export async function obtenerProductoPorIdCtrl(req, res, next) {
  try {
    const { id } = req.params;
    const encontrado = await buscarProductoPorId(id);
    if (!encontrado) throw Object.assign(new Error('Producto no encontrado'), { status: 404 });
    res.json(aHateoasRecurso(req, 'productos', encontrado));
  } catch (err) {
    next(err);
  }
}

export async function actualizarProductoCtrl(req, res, next) {
  try {
    const { id } = req.params;
    const datos = { ...req.body };
    const actualizado = await actualizarProducto(id, datos);
    if (!actualizado) throw Object.assign(new Error('Producto no encontrado'), { status: 404 });
    res.json(aHateoasRecurso(req, 'productos', actualizado));
  } catch (err) {
    next(err);
  }
}

export async function eliminarProductoCtrl(req, res, next) {
  try {
    const { id } = req.params;
    const ok = await eliminarProducto(id);
    if (!ok) throw Object.assign(new Error('Producto no encontrado'), { status: 404 });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

