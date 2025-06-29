import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'mobile',
        width: 768,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/*'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'focalX',
      type: 'number',
      admin: {
        description: 'Focal point X coordinate (0-100)',
      },
    },
    {
      name: 'focalY',
      type: 'number',
      admin: {
        description: 'Focal point Y coordinate (0-100)',
      },
    },
  ],
}