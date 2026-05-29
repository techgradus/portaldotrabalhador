import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const databaseUrl = process.env.DATABASE_URL?.trim();
export const isDatabaseConfigured = Boolean(databaseUrl);

export const prisma = new PrismaClient();
