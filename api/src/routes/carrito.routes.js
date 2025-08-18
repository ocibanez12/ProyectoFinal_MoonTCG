import { Router } from 'express';
import { obtenerCarritoCtrl, crearCarritoItemCtrl, actualizarCarritoCantidadCtrl, eliminarCarritoItemCtrl, eliminarCarritoCtrl } from '../controllers/carrito.controller.js';

export const enrutador = Router();

enrutador.get('/', obtenerCarritoCtrl);
enrutador.post('/', crearCarritoItemCtrl);
enrutador.patch('/', actualizarCarritoCantidadCtrl);
enrutador.delete('/item', eliminarCarritoItemCtrl);
enrutador.delete('/', eliminarCarritoCtrl);

