import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'
import { config } from '../config/env'

export const s3Config = cloudStorage({
  adapter: s3Adapter({
    config: {
      credentials: {
        accessKeyId: config.S3_ACCESS_KEY_ID || '',
        secretAccessKey: config.S3_SECRET_ACCESS_KEY || '',
      },
      region: config.S3_REGION,
      ...(config.S3_ENDPOINT && {
        endpoint: config.S3_ENDPOINT,
        forcePathStyle: true,
      }),
    },
    bucket: config.S3_BUCKET || '',
  }),
  collections: {
    media: {
      prefix: 'media',
    },
  },
})