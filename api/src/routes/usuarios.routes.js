import { Router } from 'express';
import { obtenerUsuariosCtrl, obtenerUsuarioPorIdCtrl, crearUsuarioCtrl, actualizarUsuarioCtrl, eliminarUsuarioCtrl, loginUsuarioCtrl } from '../controllers/usuarios.controller.js';

export const enrutador = Router();

enrutador.get('/', obtenerUsuariosCtrl);
enrutador.post('/', crearUsuarioCtrl);
enrutador.post('/login', loginUsuarioCtrl);
enrutador.get('/:id', obtenerUsuarioPorIdCtrl);
enrutador.patch('/:id', actualizarUsuarioCtrl);
enrutador.delete('/:id', eliminarUsuarioCtrl);

