import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('4000'),
  MONGODB_URI: z.string().default('mongodb://localhost:27017/lms'),
  CORS_ORIGIN: z.string().default('*'),
  JWT_SECRET: z.string().default('your-jwt-secret-change-in-production'),
});

export const config = envSchema.parse(process.env);