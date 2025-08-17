export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const code = err.code || undefined;
  const message = err.message || 'Error interno del servidor';
  if (status >= 500) {
    console.error(err);
  }
  res.status(status).json({ error: message, code });
}

