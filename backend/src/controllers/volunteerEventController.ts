import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /events - List all volunteer events (public)
export const listEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await prisma.volunteerEvent.findMany({
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        attendees: { select: { id: true, name: true, email: true } },
      },
    });
    res.json(events);
  } catch (error: any) {
    console.error("listEvents error:", error.message, error.stack);
    res.status(500).json({ error: "An unexpected error occurred while fetching events." });
  }
};

// POST /events - Create a new volunteer event (secured)
export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, date, location, category } = req.body;
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const event = await prisma.volunteerEvent.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        category,
        createdById: userId,
      },
    });
    res.status(201).json(event);
  } catch (error: any) {
    console.error("createEvent error:", error.message, error.stack);
    res.status(500).json({ error: "An unexpected error occurred while creating the event." });
  }
};

// POST /events/:id/join - Join an event (secured)
export const joinEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const eventId = parseInt(req.params.id, 10);
    if (isNaN(eventId)) {
      res.status(400).json({ message: "Invalid event ID" });
      return;
    }
    const event = await prisma.volunteerEvent.findUnique({
      where: { id: eventId },
      include: { attendees: true },
    });
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    const alreadyJoined = event.attendees.some(
      (attendee) => attendee.id === userId
    );
    if (alreadyJoined) {
      res.status(400).json({ message: "User already joined this event" });
      return;
    }
    const updatedEvent = await prisma.volunteerEvent.update({
      where: { id: eventId },
      data: {
        attendees: { connect: { id: userId } },
      },
      include: { attendees: true },
    });
    res.json(updatedEvent);
  } catch (error: any) {
    console.error("joinEvent error:", error.message, error.stack);
    res.status(500).json({ error: "An unexpected error occurred while joining the event." });
  }
};

export const getEventDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventId = parseInt(req.params.id, 10);
    if (isNaN(eventId)) {
      res.status(400).json({ message: "Invalid event ID" });
      return;
    }
    const event = await prisma.volunteerEvent.findUnique({
      where: { id: eventId },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        attendees: true
      }
    });
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.json(event);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};