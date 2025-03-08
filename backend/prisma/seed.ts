import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Optional: Clear existing data for a fresh seed run.
  await prisma.volunteerEvent.deleteMany();
  await prisma.user.deleteMany();

  // Define multiple test users data
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
    }
  ];

  // Insert test users into the database.
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

  // Prepare volunteer events data for multiple users.
  const eventsData = [
    // Events created by Alice
    ...[
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
      }
    ],
    // Events created by Bob
    ...[
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
      }
    ],
    // Events created by Charlie
    ...[
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
    ]
  ];

  // Insert volunteer events into the database.
  for (const eventData of eventsData) {
    await prisma.volunteerEvent.create({
      data: eventData,
    });
  }

  console.log("Database seeding completed successfully with multiple test users and volunteer events!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });