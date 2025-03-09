import { Request, Response, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentUser: RequestHandler = async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        attendedEvents: {
          include: {
            createdBy: { select: { id: true, name: true, email: true } }
          }
        },
        volunteerEvents: {
          include: {
            attendees: true
          }
        }
      }
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password, // Note: In a real-world app, never store plain passwords!
        name
      }
    });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};