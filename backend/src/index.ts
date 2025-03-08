import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import volunteerEventRoutes from './routes/volunteerEventRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins (or restrict as needed)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// A simple health check route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express & TypeScript with Prisma!');
});

// Use the user routes
app.use('/users', userRoutes);

// Mount authentication routes
app.use('/auth', authRoutes);

// Volunteer Event Route
app.use('/events', volunteerEventRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));