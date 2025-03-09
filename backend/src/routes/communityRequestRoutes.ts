import { Router } from 'express';
import { listCommunityRequests, getCommunityRequest, createCommunityRequest } from '../controllers/communityRequestController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', listCommunityRequests);
router.get('/:id', getCommunityRequest);
router.post('/', verifyToken, createCommunityRequest);

export default router;