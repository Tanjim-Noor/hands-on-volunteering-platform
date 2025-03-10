import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Create a new team.
 * Only authenticated users can create a team.
 * For a private team, an optional array of invite emails may be provided.
 */
export const createTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, isPrivate, invites } = req.body;
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (!name) {
      res.status(400).json({ message: "Team name is required" });
      return;
    }
    const team = await prisma.team.create({
      data: {
        name,
        description,
        isPrivate,
        members: {
          connect: { id: userId }
        },
        invites: isPrivate && invites && Array.isArray(invites)
          ? {
              create: invites.map((email: string) => ({ email }))
            }
          : undefined,
      },
      include: {
        invites: true,
        members: true
      }
    });
    res.status(201).json(team);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

/**
 * Update the team invites.
 * Only team members can update invites.
 */
export const updateTeamInvites = async (req: Request, res: Response): Promise<void> => {
  try {
    const teamId = parseInt(req.params.id, 10);
    const { invites } = req.body; // Array of emails
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { members: true }
    });
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }
    const isMember = team.members.some(member => member.id === userId);
    if (!isMember) {
      res.status(403).json({ message: "Only team members can update invites" });
      return;
    }
    // Remove existing invites and add new ones
    await prisma.teamInvite.deleteMany({
      where: { teamId }
    });
    if (invites && Array.isArray(invites)) {
      for (const email of invites) {
        await prisma.teamInvite.create({
          data: {
            email,
            team: { connect: { id: teamId } }
          }
        });
      }
    }
    res.status(200).json({ message: "Invite list updated" });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

/**
 * Join a team.
 * - For public teams: allow immediate joining.
 * - For private teams: check if user's email is in the invite list.
 */
export const joinTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const teamId = parseInt(req.params.id, 10);
    const userId = (req as any).user?.id;
    const userEmail = (req as any).user?.email;
    if (!userId || !userEmail) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { members: true, invites: true }
    });
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }
    if (team.members.some(member => member.id === userId)) {
      res.status(400).json({ message: "User is already a team member" });
      return;
    }
    if (!team.isPrivate) {
      await prisma.team.update({
        where: { id: teamId },
        data: { members: { connect: { id: userId } } }
      });
      res.status(200).json({ message: "Joined team successfully" });
      return;
    }
    const inviteExists = team.invites.some(
      invite => invite.email.toLowerCase() === userEmail.toLowerCase()
    );
    if (!inviteExists) {
      res.status(403).json({ message: "You are not invited to join this private team" });
      return;
    }
    await prisma.team.update({
      where: { id: teamId },
      data: { members: { connect: { id: userId } } }
    });
    await prisma.teamInvite.deleteMany({
      where: { teamId, email: { equals: userEmail, mode: 'insensitive'} }
    });
    res.status(200).json({ message: "Joined team successfully" });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

/**
 * Get the detailed team dashboard.
 * Only accessible if the user is a team member.
 */
export const getTeamDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const teamId = parseInt(req.params.id, 10);
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { members: true, events: true, invites: true }
    });
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }
    const isMember = team.members.some(member => member.id === userId);
    if (!isMember) {
      res.status(403).json({ message: "Access denied. You are not a member of this team." });
      return;
    }
    res.status(200).json(team);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

/**
 * Create a Volunteer Event for a Team.
 * Only team members can create events for their team.
 */
export const createTeamEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const teamId = parseInt(req.params.id, 10);
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { members: true }
    });
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }
    const isMember = team.members.some(member => member.id === userId);
    if (!isMember) {
      res.status(403).json({ message: "Only team members can create events for this team" });
      return;
    }
    const { title, description, date, location, category } = req.body;
    if (!title || !date || !location || !category) {
      res.status(400).json({ message: "Missing required event fields" });
      return;
    }
    const teamEvent = await prisma.volunteerEvent.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        category,
        createdBy: { connect: { id: userId } },
        team: { connect: { id: teamId } }
      }
    });
    res.status(201).json(teamEvent);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

/**
 * Get teams that the current user is a member of.
 */
export const getMyTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const myTeams = await prisma.team.findMany({
      where: {
        members: { some: { id: userId } },
      },
      include: { members: true, events: true, invites: true }
    });
    res.status(200).json(myTeams);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

/**
 * Get teams available to join.
 * This returns public teams where the current user is not already a member.
 */
export const getAvailableTeams = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      // Removed isPrivate filter so that both public and private teams are returned
      const availableTeams = await prisma.team.findMany({
        where: {
          members: { none: { id: userId } }
        },
        include: { members: true, events: true, invites: true }
      });
      res.status(200).json(availableTeams);
      return;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      return;
    }
  };