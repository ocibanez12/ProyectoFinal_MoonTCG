import { Router } from 'express';
import { obtenerProductosCtrl, obtenerProductoPorIdCtrl, crearProductoCtrl, actualizarProductoCtrl, eliminarProductoCtrl } from '../controllers/productos.controller.js';

export const enrutador = Router();

enrutador.get('/', obtenerProductosCtrl);
enrutador.post('/', crearProductoCtrl);
enrutador.get('/:id', obtenerProductoPorIdCtrl);
enrutador.patch('/:id', actualizarProductoCtrl);
enrutador.delete('/:id', eliminarProductoCtrl);

