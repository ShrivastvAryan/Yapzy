import express from "express";
import type { Request, Response } from "express";
import { users } from "./db/schema";
import { db } from "./db";
import { initSocket } from "./lib/socket";
import authRoutes from "./routes/auth.routes";

const app = express();
const port = 8000;

app.use(express.json());

const httpServer = app.listen(port);
initSocket(httpServer);

app.use('/api/auth', authRoutes);

app.get('/users', async (req:Request, res:Response) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get("/health", (req: Request, res: Response) => {
  res.send("Server is healthy!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});