import { Router } from 'express';
import { 
  createTeam, 
  updateTeamInvites, 
  joinTeam, 
  getTeamDashboard, 
  createTeamEvent, 
  getMyTeams, 
  getAvailableTeams 
} from '../controllers/teamController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

// Team creation and management endpoints
router.post('/', verifyToken, createTeam);
router.put('/:id/invites', verifyToken, updateTeamInvites);
router.post('/:id/join', verifyToken, joinTeam);
router.get('/:id/dashboard', verifyToken, getTeamDashboard);
router.post('/:id/events', verifyToken, createTeamEvent);

// Endpoints for team listings
router.get('/my', verifyToken, getMyTeams);
router.get('/available', verifyToken, getAvailableTeams);

export default router;