import express from "express";
import type { Request, Response } from "express";
import { users } from "./db/schema";
import { db } from "./db";
import { initSocket } from "./lib/socket";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors({
  origin: "http://localhost:3000", // Your Frontend URL
  credentials: true,               // Required to allow cookies/Refresh Tokens
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use(cookieParser());

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