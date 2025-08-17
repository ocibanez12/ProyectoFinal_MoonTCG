export function notFound(req, res, next) {
  res.status(404).json({ error: 'Recurso no encontrado' });
}

