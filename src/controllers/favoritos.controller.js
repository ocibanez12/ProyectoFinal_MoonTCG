import { toHateoasCollection } from '../helpers/hateoas.js';
import { addFavorito, removeFavorito, listFavoritos } from '../models/favoritos.model.js';

export async function postFavorito(req, res, next) {
  try {
    const { usuario_id, producto_id } = req.body || {};
    if (!usuario_id || !producto_id) throw Object.assign(new Error('usuario_id y producto_id requeridos'), { status: 400 });
    const created = await addFavorito({ usuario_id, producto_id });
    res.status(created ? 201 : 200).json({ created: Boolean(created) });
  } catch (err) {
    next(err);
  }
}

export async function deleteFavorito(req, res, next) {
  try {
    const { usuario_id, producto_id } = req.body || {};
    if (!usuario_id || !producto_id) throw Object.assign(new Error('usuario_id y producto_id requeridos'), { status: 400 });
    const removed = await removeFavorito({ usuario_id, producto_id });
    res.status(200).json({ removed });
  } catch (err) {
    next(err);
  }
}

export async function getFavoritos(req, res, next) {
  try {
    const { usuario_id, page = 1, pageSize = 10 } = req.query || {};
    if (!usuario_id) throw Object.assign(new Error('usuario_id requerido'), { status: 400 });
    const result = await listFavoritos({ usuario_id, page, pageSize });
    res.json(toHateoasCollection(req, 'favoritos', result.rows, result));
  } catch (err) {
    next(err);
  }
}

