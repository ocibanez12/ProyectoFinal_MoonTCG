function baseUrlFromRequest(req) {
  const protocol = req.protocol;
  const host = req.get('host');
  return `${protocol}://${host}`;
}

export function itemLinks(req, resource, id) {
  const base = baseUrlFromRequest(req);
  return {
    self: `${base}/api/${resource}/${id}`,
    collection: `${base}/api/${resource}`,
  };
}

export function collectionLinks(req, resource, page, pageSize, total) {
  const base = baseUrlFromRequest(req);
  const url = new URL(`${base}/api/${resource}`);
  url.searchParams.set('page', String(page));
  url.searchParams.set('pageSize', String(pageSize));
  const links = { self: url.toString() };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (page < totalPages) {
    const nextUrl = new URL(url);
    nextUrl.searchParams.set('page', String(page + 1));
    links.next = nextUrl.toString();
  }
  if (page > 1) {
    const prevUrl = new URL(url);
    prevUrl.searchParams.set('page', String(page - 1));
    links.prev = prevUrl.toString();
  }
  links.first = (() => {
    const u = new URL(url);
    u.searchParams.set('page', '1');
    return u.toString();
  })();
  links.last = (() => {
    const u = new URL(url);
    u.searchParams.set('page', String(totalPages));
    return u.toString();
  })();
  return links;
}

export function toHateoasCollection(req, resource, rows, { page = 1, pageSize = rows.length || 10, total = rows.length } = {}) {
  return {
    count: rows.length,
    total,
    page,
    pageSize,
    items: rows.map((row) => ({
      ...row,
      _links: itemLinks(req, resource, row.id),
    })),
    _links: collectionLinks(req, resource, page, pageSize, total),
  };
}

export function toHateoasItem(req, resource, row) {
  return {
    ...row,
    _links: itemLinks(req, resource, row.id),
  };
}

