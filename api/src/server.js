import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { enrutador as apiRouter } from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: 'TCGMoon API',
    version: '1.0.0',
    endpoints: {
      usuarios: '/api/usuarios',
      productos: '/api/productos',
      favoritos: '/api/favoritos',
      carrito: '/api/carrito'
    }
  });
});

app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TCGMoon API running on http://localhost:${PORT}`);
});

