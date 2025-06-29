import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

import { Users } from './src/collections/Users.ts'
import { Media } from './src/collections/Media.ts'
import { Pages } from './src/collections/Pages.ts'
import { Navigation } from './src/globals/Navigation.ts'
import { Settings } from './src/globals/Settings.ts'
import { config } from './config/env.ts'

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [Users, Media, Pages],
  globals: [Navigation, Settings],
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
  secret: config.PAYLOAD_SECRET,
  db: mongooseAdapter({
    url: config.DATABASE_URI,
  }),
  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    config.NEXT_PUBLIC_APP_URL,
  ].filter(Boolean),
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001', 
    config.NEXT_PUBLIC_APP_URL,
  ].filter(Boolean),
})