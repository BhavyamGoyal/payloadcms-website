import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3001'),
  DATABASE_URI: z.string().default('mongodb://localhost:27017/payload'),
  PAYLOAD_SECRET: z.string().default('your-payload-secret-change-in-production'),
  NEXT_PUBLIC_APP_URL: z.string().default('http://localhost:3000'),
});

export const config = envSchema.parse(process.env);