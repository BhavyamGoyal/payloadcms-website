import type { GlobalConfig } from 'payload'
import { adminOrEditor } from '../../access/roles'

export const Hero: GlobalConfig = {
  slug: 'hero',
  access: {
    read: () => true,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Main hero title text',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Hero subtitle/description text',
      },
    },
    {
      name: 'primaryButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Hero section image',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Hero background image (optional)',
      },
    },
  ],
}