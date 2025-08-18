import { Router } from 'express';
import { obtenerFavoritosCtrl, crearFavoritoCtrl, eliminarFavoritoCtrl } from '../controllers/favoritos.controller.js';

export const enrutador = Router();

enrutador.get('/', obtenerFavoritosCtrl);
enrutador.post('/', crearFavoritoCtrl);
enrutador.delete('/', eliminarFavoritoCtrl);

