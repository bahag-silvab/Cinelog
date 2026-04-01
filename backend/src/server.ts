import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import watchlistRoutes from './routes/watchlist';
import { verifyToken } from './middleware/auth';
import { sequelize } from './config/database';
import './models/associations';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', verifyToken, watchlistRoutes);

const PORT = process.env.PORT ?? 3000;
(async () => {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();

export default app;
