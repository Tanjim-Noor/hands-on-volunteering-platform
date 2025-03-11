# HandsOn Volunteering Platform

## Project Overview
HandsOn is a community-driven social volunteering platform that connects individuals with meaningful social impact opportunities. Think of it as a **"GitHub for social work"** where people contribute their time instead of code to build real-world impact. With HandsOn, users can:

- **Sign Up & Profile Management:** Register securely, manage basic profile details (skills, causes), and view their volunteer history.
- **Discover & Join Volunteer Events:** Create, browse, and join volunteer events easily via one-click registration.
- **Community Help Requests:** Post and respond to help requests with different urgency levels.
- **Form Teams & Group Initiatives:** Create and join teams (public or private) for larger collaborative volunteer initiatives.
- **Impact Tracking & Social Recognition:** Log volunteer hours, earn points per hour, and receive automatic/peer verification. *(still in development)*

## Technologies Used
- **Frontend:** React.js (Vite, Tailwind CSS)
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL (Prisma ORM)
- **Authentication:** JWT-based authentication with bcrypt for password hashing
- **API Communication:** REST API

## Features
- **User Registration & Profile Management:**  
  Secure email/password sign-up and login. User profiles capture basic information, skills, and causes supported, with a dashboard to manage volunteer history.

- **Discover & Join Volunteer Events:**  
  Users or organizations can create events with details like title, description, date/time, location, and category. A public event feed supports filtering and one-click event registration.

- **Community Help Requests:**  
  Supports posting help requests with urgency levels and allows community members to join in by commenting or coordinating privately.

- **Form Teams & Group Initiatives:**  
  Users can create teams (public or private) to organize long-term initiatives. Private teams allow controlled membership via email invites, while public teams are open to all users. Team dashboards show members, events, and achievements. 

- **Impact Tracking & Social Recognition:**  
  Volunteers can log hours after events, earning points for each hour. Some events are auto-verified while others need peer verification. Future enhancements will include auto-generated certificates and a leaderboard. *(still in development)*

## Database Schema
The database is structured around several key models:

- **User:** Captures user details such as email, password, name, skills, and causes.
- **VolunteerEvent:** Stores event details including title, description, date, time, location, category, and attendees.
- **CommunityRequest:** Contains requests for help, with urgency levels and associated comments.
- **Comment:** Tracks comments made by users on community requests.
- **Team:** Represents a team with fields for name, description, privacy status, and members.
- **TeamInvite:** Manages invitation emails for private team membership.
- **ImpactLog:** Logs volunteer hours and the verification status (auto or peer).

*For a visual representation of the schema, [Database Schema Diagram](#database-schema-diagram)*

## Database Schema Diagram
   
![Database Schema](backend/prisma/schema20diagram.png)

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (version 14+ recommended)
- [PostgreSQL](https://www.postgresql.org/) installed and running
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (optional)

### Using Docker Compose (Optional)
1. Ensure Docker and Docker Compose are installed on your machine.
2. In the root directory of the project, create or review the `docker-compose.yml` file. An example configuration:
```yaml
services:
  postgres:
    image: postgres:latest
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: hands_on_db
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```
3. To pull postgres image, build and run the containers using Docker Compose, execute:
```bash
docker pull postgres
docker-compose up --build
```
This will start the PostgreSQL database, the backend server, and the frontend development server.

### Backend Setup
1. Navigate to the `backend` folder:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file based on the sample provided and configure the following environment variables:
```
DATABASE_URL=postgresql://user:password@localhost:5432/hands_on_db
JWT_SECRET=your_jwt_secret
PORT=5000
```
4. Run database migrations and seed the database using Prisma:
```bash
npx prisma migrate dev
npx prisma db seed
```
5. Start the backend server:
```bash
npm run dev
```

### Frontend Setup (Without Docker)
1. Navigate to the `frontend` folder:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the frontend development server:
```bash
npm run dev
```

## API Documentation
Below is a summary of key API endpoints:

### Authentication
- `POST /auth/register` - Register a new user.
- `POST /auth/login` - User login to receive a JWT token.

### Users
- `GET /users/me` - Fetch the current user's profile.
- `GET /users/:id` - Retrieve user details by user ID.

### Volunteer Events
- `GET /events` - List all volunteer events with optional filtering.
- `GET /events/:id` - Retrieve details of a specific event.
- `POST /events` - Create a new event (protected route).
- `POST /events/:id/join` - Register to attend an event (protected route).

### Community Help Requests
- `GET /community-requests` - List all community help requests.
- `GET /community-requests/:id` - Retrieve a specific help request.
- `POST /community-requests` - Create a new help request (protected route).
- `POST /community-requests/:id/comments` - Add a comment to a help request (protected route).

### Teams
- `POST /teams` - Create a new team (protected route).
- `PUT /teams/:id/invites` - Update team invitation list (protected route).
- `POST /teams/:id/join` - Join a team (protected route).
- `GET /teams/:id/dashboard` - Get the detailed team dashboard (protected route).
- `POST /teams/:id/events` - Create a team event (protected route).
- `GET /teams/my` - Retrieve teams the user is a member of (protected route).
- `GET /teams/available` - Retrieve available teams for joining (protected route).

## Running the Project
### Local Development
To run the project locally, follow the setup instructions above for both the backend and frontend. Ensure that your PostgreSQL database is running and configured correctly in your `.env` file.

## Additional Notes
- **Development Status:** Some features such as advanced impact tracking (certificate generation, leaderboard) and additional UI/UX improvements for teams are still in development.
- **Git Workflow:** This project adheres to best practices in version control:
  - Use of feature branches (e.g., `feature/teams`) with incremental commits following Conventional Commits.
  - The `main` branch is reserved for stable code.
- **Future Enhancements:** Planned future improvements include additional validations, loading indicators, and enhanced error handling (e.g., toast notifications).

## License
This project is licensed under the [MIT License](LICENSE).