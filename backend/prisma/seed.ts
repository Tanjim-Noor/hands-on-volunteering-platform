import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear all existing data.
  // Order matters to respect foreign key constraints.
  await prisma.comment.deleteMany();
  await prisma.communityRequest.deleteMany();
  await prisma.impactLog.deleteMany();
  await prisma.teamInvite.deleteMany();
  await prisma.team.deleteMany();
  await prisma.volunteerEvent.deleteMany();
  await prisma.user.deleteMany();

  // -------------------------------
  // Create multiple test users
  // -------------------------------
  const usersData = [
    {
      email: "alice@example.com",
      password: "alice123",
      name: "Alice Wonderland",
      skills: "communication, organizing",
      causes: "environment, education"
    },
    {
      email: "bob@example.com",
      password: "bob123",
      name: "Bob Builder",
      skills: "engineering, carpentry",
      causes: "community, housing"
    },
    {
      email: "charlie@example.com",
      password: "charlie123",
      name: "Charlie Chaplin",
      skills: "entertainment, leadership",
      causes: "culture, arts"
    },
    {
      email: "diana@example.com",
      password: "diana123",
      name: "Diana Prince",
      skills: "strategy, management",
      causes: "healthcare, education"
    }
  ];

  const createdUsers: Array<{ id: number; email: string }> = [];
  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        skills: userData.skills,
        causes: userData.causes,
      }
    });
    createdUsers.push({ id: user.id, email: user.email });
  }

  // -------------------------------
  // Create Volunteer Events
  // -------------------------------
  const eventsData = [
    // Events created by Alice
    {
      title: "Alice's Park Cleanup",
      description: "Join Alice to clean up the local park.",
      date: new Date("2023-10-01T09:00:00Z"),
      location: "Alice Park",
      category: "Environment",
      createdById: createdUsers.find(u => u.email === "alice@example.com")!.id,
    },
    {
      title: "Alice's Food Drive",
      description: "Help Alice organize a food drive at the community center.",
      date: new Date("2023-10-03T11:00:00Z"),
      location: "Community Center",
      category: "Social",
      createdById: createdUsers.find(u => u.email === "alice@example.com")!.id,
    },
    // Events created by Bob
    {
      title: "Bob's Construction Volunteer Day",
      description: "Volunteer with Bob on a community construction project.",
      date: new Date("2023-10-05T08:00:00Z"),
      location: "Downtown",
      category: "Housing",
      createdById: createdUsers.find(u => u.email === "bob@example.com")!.id,
    },
    {
      title: "Bob's Carpentry Workshop",
      description: "Join Bob’s workshop to learn carpentry and help build community structures.",
      date: new Date("2023-10-07T14:00:00Z"),
      location: "Workshop Studio",
      category: "Education",
      createdById: createdUsers.find(u => u.email === "bob@example.com")!.id,
    },
    // Events created by Charlie
    {
      title: "Charlie's Charity Theater",
      description: "An evening of charity theater organized by Charlie.",
      date: new Date("2023-10-09T19:00:00Z"),
      location: "Community Theater",
      category: "Culture",
      createdById: createdUsers.find(u => u.email === "charlie@example.com")!.id,
    },
    {
      title: "Charlie's Art and Music Festival",
      description: "Volunteer to organize an art and music festival.",
      date: new Date("2023-10-11T12:00:00Z"),
      location: "City Arena",
      category: "Arts",
      createdById: createdUsers.find(u => u.email === "charlie@example.com")!.id,
    }
  ];

  for (const eventData of eventsData) {
    await prisma.volunteerEvent.create({
      data: eventData,
    });
  }

  // -------------------------------
  // Create Community Help Requests and Comments
  // -------------------------------
  const communityRequestsData = [
    {
      title: "Need Volunteers for Winter Clothing Distribution",
      description: "We need volunteers to help distribute winter clothing to the homeless.",
      urgency: "urgent",
      createdById: createdUsers.find(u => u.email === "diana@example.com")!.id,
    },
    {
      title: "Tutoring Program",
      description: "Looking for volunteers to help tutor high school students in math.",
      urgency: "medium",
      createdById: createdUsers.find(u => u.email === "alice@example.com")!.id,
    }
  ];

  const createdRequests = [];
  for (const reqData of communityRequestsData) {
    const req = await prisma.communityRequest.create({
      data: reqData,
    });
    createdRequests.push(req);
  }

  const communityCommentsData = [
    {
      text: "I can volunteer this weekend.",
      authorId: createdUsers.find(u => u.email === "bob@example.com")!.id,
      requestId: createdRequests[0].id,
    },
    {
      text: "I have experience tutoring math, count me in!",
      authorId: createdUsers.find(u => u.email === "charlie@example.com")!.id,
      requestId: createdRequests[1].id,
    },
    {
      text: "Please provide more details on the pickup location.",
      authorId: createdUsers.find(u => u.email === "diana@example.com")!.id,
      requestId: createdRequests[0].id,
    }
  ];

  for (const commentData of communityCommentsData) {
    await prisma.comment.create({
      data: commentData,
    });
  }

  // -------------------------------
  // Create Teams and Team Invites
  // -------------------------------
  // Create a public team without invites
  const publicTeam = await prisma.team.create({
    data: {
      name: "City Cleaners",
      description: "A public team for community cleaning projects.",
      isPrivate: false,
      members: {
        connect: [
          { id: createdUsers.find(u => u.email === "alice@example.com")!.id },
          { id: createdUsers.find(u => u.email === "bob@example.com")!.id }
        ]
      }
    }
  });

  // Create a private team with invites
  const privateTeam = await prisma.team.create({
    data: {
      name: "Green Warriors",
      description: "A private team dedicated to environmental initiatives.",
      isPrivate: true,
      members: {
        connect: [
          { id: createdUsers.find(u => u.email === "charlie@example.com")!.id },
          { id: createdUsers.find(u => u.email === "diana@example.com")!.id }
        ]
      },
      invites: {
        create: [
          { email: "eve@example.com" },
          { email: "frank@example.com" }
        ]
      }
    }
  });

  // -------------------------------
  // Create Team-specific Events
  // -------------------------------
  await prisma.volunteerEvent.create({
    data: {
      title: "City Cleaners Spring Cleanup",
      description: "Join the City Cleaners team for a spring park cleanup.",
      date: new Date("2023-11-01T10:00:00Z"),
      location: "Central Park",
      category: "Environment",
      createdBy: { connect: { id: createdUsers.find(u => u.email === "alice@example.com")!.id } },
      team: { connect: { id: publicTeam.id } }
    }
  });

  // -------------------------------
  // Create Impact Logs for Users
  // -------------------------------
  const impactLogsData = [
    {
      volunteerHours: 5,
      verified: true,
      userId: createdUsers.find(u => u.email === "alice@example.com")!.id,
    },
    {
      volunteerHours: 8,
      verified: true,
      userId: createdUsers.find(u => u.email === "bob@example.com")!.id,
    },
    {
      volunteerHours: 3,
      verified: false,
      userId: createdUsers.find(u => u.email === "charlie@example.com")!.id,
    },
    {
      volunteerHours: 10,
      verified: true,
      userId: createdUsers.find(u => u.email === "diana@example.com")!.id,
    }
  ];

  for (const logData of impactLogsData) {
    await prisma.impactLog.create({
      data: logData,
    });
  }

  console.log("Database seeding completed successfully with multiple test users, volunteer events, community requests (with comments), teams, team events, and impact logs!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });