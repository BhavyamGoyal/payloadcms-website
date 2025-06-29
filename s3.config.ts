import { S3Client } from '@aws-sdk/client-s3'

export const s3Client = new S3Client({
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
})

export const s3Config = {
  bucket: process.env.S3_BUCKET!,
  region: process.env.S3_REGION!,
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
}