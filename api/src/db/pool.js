import { Pool } from 'pg';

const tieneUrlBaseDatos = Boolean(process.env.DATABASE_URL);

const pool = tieneUrlBaseDatos
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.PGSSLMODE === 'require' || process.env.PGSSL === 'true'
          ? { rejectUnauthorized: false }
          : undefined,
    })
  : new Pool({
      host: process.env.PGHOST || '127.0.0.1',
      port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || '',
      database: process.env.PGDATABASE || 'tcgmoon',
    });

export const consultar = (texto, parametros) => pool.query(texto, parametros);
export const obtenerCliente = () => pool.connect();
export default pool;

