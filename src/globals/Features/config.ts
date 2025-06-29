import type { GlobalConfig } from 'payload'
import { adminOrEditor } from '../../access/roles'

export const Features: GlobalConfig = {
  slug: 'features',
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
        description: 'Features section title',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'Features section subtitle/description',
      },
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Feature icon/image',
          },
        },
        {
          name: 'iconName',
          type: 'text',
          admin: {
            description: 'Lucide icon name (alternative to uploaded icon)',
          },
        },
      ],
      minRows: 1,
      maxRows: 12,
      admin: {
        components: {
          RowLabel: ({ data, index }) => {
            return data?.title || `Feature ${String(index).padStart(2, '0')}`
          },
        },
      },
    },
  ],
}