import { Router } from 'express';
import { getProductos, getProductoById, postProducto, patchProducto, deleteProductoById } from '../controllers/productos.controller.js';

export const router = Router();

router.get('/', getProductos);
router.post('/', postProducto);
router.get('/:id', getProductoById);
router.patch('/:id', patchProducto);
router.delete('/:id', deleteProductoById);

