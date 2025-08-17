export function requestLogger(req, res, next) {
  const startedAt = Date.now();
  res.on('finish', () => {
    const elapsedMs = Date.now() - startedAt;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${elapsedMs}ms`);
  });
  next();
}

