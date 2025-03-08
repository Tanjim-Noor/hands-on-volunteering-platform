import express from 'express';
import { getUsers, createUser, getCurrentUser } from '../controllers/userController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// GET /users - Retrieve all users
router.get('/', getUsers);

// New endpoint: GET /users/me (protected)
router.get('/me', verifyToken, getCurrentUser);

// POST /users - Create a new user
router.post('/', createUser);

export default router;