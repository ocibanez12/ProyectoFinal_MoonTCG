import { Router } from 'express';
import { getFavoritos, postFavorito, deleteFavorito } from '../controllers/favoritos.controller.js';

export const router = Router();

router.get('/', getFavoritos);
router.post('/', postFavorito);
router.delete('/', deleteFavorito);

