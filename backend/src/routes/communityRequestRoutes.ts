import { Router } from 'express';
import { listCommunityRequests, getCommunityRequest, createCommunityRequest, addComment } from '../controllers/communityRequestController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', listCommunityRequests);
router.get('/:id', getCommunityRequest);
router.post('/', verifyToken, createCommunityRequest);
//Route to add a comment to a community request
router.post('/:id/comments', verifyToken, addComment);

export default router;