import { Router } from 'express';
import { listEvents, createEvent, joinEvent, getEventDetails } from '../controllers/volunteerEventController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

// Public route: list all events
router.get('/', listEvents);

// Secured route: create a new event
router.post('/', verifyToken, createEvent);

// Public route: get event details by ID
router.get('/:id', getEventDetails);

// Secured route: join an event
router.post('/:id/join', verifyToken, joinEvent);

export default router;