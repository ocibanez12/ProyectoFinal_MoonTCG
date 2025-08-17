import { Router } from 'express';
import { getCarrito, postCarrito, patchCarritoCantidad, deleteCarritoItem, deleteCarrito } from '../controllers/carrito.controller.js';

export const router = Router();

router.get('/', getCarrito);
router.post('/', postCarrito);
router.patch('/', patchCarritoCantidad);
router.delete('/item', deleteCarritoItem);
router.delete('/', deleteCarrito);

