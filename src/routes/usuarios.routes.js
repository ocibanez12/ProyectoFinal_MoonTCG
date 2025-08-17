import { Router } from 'express';
import { getUsuarios, getUsuarioById, postUsuario, patchUsuario, deleteUsuarioById, loginUsuario } from '../controllers/usuarios.controller.js';

export const router = Router();

router.get('/', getUsuarios);
router.post('/', postUsuario);
router.post('/login', loginUsuario);
router.get('/:id', getUsuarioById);
router.patch('/:id', patchUsuario);
router.delete('/:id', deleteUsuarioById);

