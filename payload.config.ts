import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

// Import collections
import { Users } from './apps/admin/src/collections/Users'
import { Pages } from './apps/admin/src/collections/Pages'
import { Media } from './apps/admin/src/collections/Media'

// Import globals
import { Navigation } from './apps/admin/src/globals/Navigation'
import { Settings } from './apps/admin/src/globals/Settings'

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    Users,
    Pages,
    Media,
  ],
  globals: [
    Navigation,
    Settings,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    // S3 storage plugin configuration can be added when needed
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET!,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),
  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.NEXT_PUBLIC_APP_URL || '',
  ].filter(Boolean),
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001', 
    process.env.NEXT_PUBLIC_APP_URL || '',
  ].filter(Boolean),
})