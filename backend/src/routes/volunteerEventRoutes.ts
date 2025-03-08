import { Router } from 'express';
import { listEvents, createEvent, joinEvent } from '../controllers/volunteerEventController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

// Public route: list all events
router.get('/', listEvents);

// Secured route: create a new event
router.post('/', verifyToken, createEvent);

// Secured route: join an event
router.post('/:id/join', verifyToken, joinEvent);

export default router;