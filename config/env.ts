import { z } from 'zod';

const envSchema = z.object({
  // Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  
  // Database
  DATABASE_URI: z.string().default('mongodb://localhost:27017/payload-marketing'),
  MONGODB_URI: z.string().optional(), // Keep for backward compatibility
  
  // Payload CMS
  PAYLOAD_SECRET: z.string().min(32, 'PAYLOAD_SECRET must be at least 32 characters').default('your-payload-secret-change-in-production-at-least-32-chars'),
  PAYLOAD_CONFIG_PATH: z.string().optional(),
  
  // Next.js
  NEXT_PUBLIC_SERVER_URL: z.string().url().optional(),
  
  // CORS
  CORS_ORIGIN: z.string().default('*'),
  
  // Authentication & Security
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters').default('your-jwt-secret-change-in-production-min-32-chars'),
  CRON_SECRET: z.string().optional(),
  
  // AWS S3 (Optional - for media uploads)
  S3_BUCKET: z.string().optional(),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  S3_REGION: z.string().default('us-east-1'),
  S3_ENDPOINT: z.string().optional(), // For S3-compatible services
  
  // Email (Optional)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  FROM_EMAIL: z.string().email().optional(),
  FROM_NAME: z.string().optional(),
  
  // Analytics (Optional)
  GOOGLE_ANALYTICS_ID: z.string().optional(),
  
  // Feature Flags
  ENABLE_LIVE_PREVIEW: z.string().transform(val => val === 'true').default('true'),
  ENABLE_DRAFT_MODE: z.string().transform(val => val === 'true').default('true'),
});

// Validate environment variables
export const config = envSchema.parse(process.env);

// Type for the validated config
export type Config = z.infer<typeof envSchema>;

// Helper to check if we're in development
export const isDev = config.NODE_ENV === 'development';
export const isProd = config.NODE_ENV === 'production';
export const isTest = config.NODE_ENV === 'test';