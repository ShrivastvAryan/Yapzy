import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import 'dotenv/config';

// For migrations and queries, postgres.js is the preferred driver
const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema });