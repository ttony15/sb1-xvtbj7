import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

const workspaceSchema = z.object({
  name: z.string().min(1, 'Workspace name is required')
});

const teamSchema = z.object({
  name: z.string().min(1, 'Team name is required')
});

const teamMemberSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(['owner', 'admin', 'member'])
});

// Create workspace
router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const data = workspaceSchema.parse(req.body);

    const workspace = await prisma.workspace.create({
      data: {
        ...data,
        users: {
          connect: { id: userId }
        }
      }
    });

    res.status(201).json(workspace);
  } catch (error) {
    console.error('Create workspace error:', error);
    res.status(500).json({ message: 'Failed to create workspace' });
  }
});

// Get user's workspace
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;

    const workspace = await prisma.workspace.findFirst({
      where: {
        users: {
          some: {
            id: userId
          }
        }
      },
      include: {
        teams: {
          include: {
            members: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true
                  }
                }
              }
            }
          }
        }
      }
    });

    res.json(workspace);
  } catch (error) {
    console.error('Get workspace error:', error);
    res.status(500).json({ message: 'Failed to fetch workspace' });
  }
});

// Create team
router.post('/:workspaceId/teams', async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const userId = req.user.id;
    const data = teamSchema.parse(req.body);

    // Verify user has access to workspace
    const workspace = await prisma.workspace.findFirst({
      where: {
        id: workspaceId,
        users: {
          some: {
            id: userId
          }
        }
      }
    });

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    const team = await prisma.team.create({
      data: {
        ...data,
        workspace: {
          connect: { id: workspaceId }
        },
        members: {
          create: {
            userId,
            role: 'owner'
          }
        }
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    res.status(201).json(team);
  } catch (error) {
    console.error('Create team error:', error);
    res.status(500).json({ message: 'Failed to create team' });
  }
});

// Add team member
router.post('/:workspaceId/teams/:teamId/members', async (req, res) => {
  try {
    const { workspaceId, teamId } = req.params;
    const userId = req.user.id;
    const data = teamMemberSchema.parse(req.body);

    // Verify user is team admin/owner
    const team = await prisma.team.findFirst({
      where: {
        id: teamId,
        workspaceId,
        members: {
          some: {
            userId,
            role: {
              in: ['owner', 'admin']
            }
          }
        }
      }
    });

    if (!team) {
      return res.status(404).json({ message: 'Team not found or insufficient permissions' });
    }

    const member = await prisma.teamMember.create({
      data: {
        role: data.role,
        team: {
          connect: { id: teamId }
        },
        user: {
          connect: { id: data.userId }
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json(member);
  } catch (error) {
    console.error('Add team member error:', error);
    res.status(500).json({ message: 'Failed to add team member' });
  }
});

export default router;