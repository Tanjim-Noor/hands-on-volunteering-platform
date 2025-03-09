import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listCommunityRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const requests = await prisma.communityRequest.findMany({
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        comments: { 
          include: { 
            author: { select: { id: true, name: true, email: true } }
          } 
        }
      }
    });
    res.json(requests);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCommunityRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const requestId = parseInt(req.params.id, 10);
    if (isNaN(requestId)) {
      res.status(400).json({ message: "Invalid request ID" });
      return;
    }

    const requestData = await prisma.communityRequest.findUnique({
      where: { id: requestId },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        comments: { 
          include: { 
            author: { select: { id: true, name: true, email: true } }
          } 
        }
      }
    });

    if (!requestData) {
      res.status(404).json({ message: "Community request not found" });
      return;
    }

    res.json(requestData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCommunityRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, urgency } = req.body;
    // Assuming your verifyToken middleware sets req.user
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!title || !urgency) {
      res.status(400).json({ message: "Title and urgency are required" });
      return;
    }

    const newRequest = await prisma.communityRequest.create({
      data: {
        title,
        description,
        urgency,
        createdById: userId
      }
    });
    
    res.status(201).json(newRequest);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// NEW: Create Comment on a Community Request
export const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const requestId = parseInt(req.params.id, 10);
    if (isNaN(requestId)) {
      res.status(400).json({ message: 'Invalid request ID' });
      return;
    }
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ message: 'Comment text is required' });
      return;
    }
    const comment = await prisma.comment.create({
      data: {
        text,
        authorId: userId,
        requestId,
      },
      include: {
        author: { select: { id: true, name: true, email: true } }
      }
    });
    res.status(201).json(comment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};