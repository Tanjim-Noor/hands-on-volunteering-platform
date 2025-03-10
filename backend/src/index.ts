import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import volunteerEventRoutes from './routes/volunteerEventRoutes';
import communityRequestRoutes from './routes/communityRequestRoutes';
import teamRoutes from './routes/teamRoutes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express & TypeScript with Prisma!');
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/events', volunteerEventRoutes);
app.use('/community-requests', communityRequestRoutes);
app.use('/teams', teamRoutes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));