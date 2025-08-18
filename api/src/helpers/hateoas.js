function urlBaseDesdeSolicitud(req) {
  const protocolo = req.protocol;
  const host = req.get('host');
  return `${protocolo}://${host}`;
}

export function enlacesDeRecurso(req, recurso, id) {
  const base = urlBaseDesdeSolicitud(req);
  return {
    self: `${base}/api/${recurso}/${id}`,
    collection: `${base}/api/${recurso}`,
  };
}

export function enlacesDeColeccion(req, recurso, pagina, tamanoPagina, total) {
  const base = urlBaseDesdeSolicitud(req);
  const url = new URL(`${base}/api/${recurso}`);
  url.searchParams.set('page', String(pagina));
  url.searchParams.set('pageSize', String(tamanoPagina));
  const enlaces = { self: url.toString() };

  const totalPaginas = Math.max(1, Math.ceil(total / tamanoPagina));
  if (pagina < totalPaginas) {
    const siguienteUrl = new URL(url);
    siguienteUrl.searchParams.set('page', String(pagina + 1));
    enlaces.next = siguienteUrl.toString();
  }
  if (pagina > 1) {
    const previaUrl = new URL(url);
    previaUrl.searchParams.set('page', String(pagina - 1));
    enlaces.prev = previaUrl.toString();
  }
  enlaces.first = (() => {
    const u = new URL(url);
    u.searchParams.set('page', '1');
    return u.toString();
  })();
  enlaces.last = (() => {
    const u = new URL(url);
    u.searchParams.set('page', String(totalPaginas));
    return u.toString();
  })();
  return enlaces;
}

export function aHateoasColeccion(req, recurso, filas, { page = 1, pageSize = filas.length || 10, total = filas.length } = {}) {
  return {
    count: filas.length,
    total,
    page,
    pageSize,
    items: filas.map((fila) => ({
      ...fila,
      _links: enlacesDeRecurso(req, recurso, fila.id),
    })),
    _links: enlacesDeColeccion(req, recurso, page, pageSize, total),
  };
}

export function aHateoasRecurso(req, recurso, fila) {
  return {
    ...fila,
    _links: enlacesDeRecurso(req, recurso, fila.id),
  };
}

