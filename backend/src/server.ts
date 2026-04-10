import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import watchlistRoutes from './routes/watchlist';
import { verifyToken } from './middleware/auth';
import { sequelize } from './config/database';
import './models/associations';

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3001', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', verifyToken, watchlistRoutes);

const PORT = Number(process.env.PORT) || 8080;

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();

export default app; 
 
