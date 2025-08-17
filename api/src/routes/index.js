import { Router } from 'express';
import { requestLogger } from '../middlewares/logger.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import { notFound } from '../middlewares/notFound.js';

import { router as usuariosRouter } from './usuarios.routes.js';
import { router as productosRouter } from './productos.routes.js';
import { router as favoritosRouter } from './favoritos.routes.js';
import { router as carritoRouter } from './carrito.routes.js';

export const router = Router();

router.use(requestLogger);

router.use('/usuarios', usuariosRouter);
router.use('/productos', productosRouter);
router.use('/favoritos', favoritosRouter);
router.use('/carrito', carritoRouter);

router.use(notFound);
router.use(errorHandler);

