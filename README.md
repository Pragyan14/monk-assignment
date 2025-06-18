
# TaskView

A simple and modern full-stack task management app built using **Next.js**, **TypeScript**, **Zustand**, and **Prisma** with **PostgreSQL (Neon DB)**.

## 🚀 Getting Started (Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables
Create a .env file in the root:
```bash
DATABASE_URL=your_neon_db_connection_string
```
You can get this from [Neon](https://neon.com/)

### 4. Apply Prisma migrations
```bash
npx prisma migrate dev --name init
```

### 5. Start the development server
```bash
npm run dev
```
Visit [http://localhost:3000]() to see the app running.

### 🧪 Test API Locally
You can test your APIs with Postman:

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` -  Add task `{ title: string }`
- `PUT /api/tasks/:id` - Update task `{ title?: string, status?: "PENDING" | "DONE" }`
- `DELETE /api/tasks/:id` - Delete task

### 🚀 Live Demo

👉 [LINK](https://monk-assignment-eta.vercel.app/)

### 🛠 Tech Stack
- Next.js
- Prisma ORM
- Neon PostgreSQL
- Tailwind CSS
