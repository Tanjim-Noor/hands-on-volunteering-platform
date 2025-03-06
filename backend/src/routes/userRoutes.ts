import express from 'express';
import { getUsers, createUser } from '../controllers/userController';

const router = express.Router();

// GET /users - Retrieve all users
router.get('/', getUsers);

// POST /users - Create a new user
router.post('/', createUser);

export default router;