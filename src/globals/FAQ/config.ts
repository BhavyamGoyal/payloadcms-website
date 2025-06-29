import type { GlobalConfig } from 'payload'
import { adminOrEditor } from '../../access/roles'

export const FAQ: GlobalConfig = {
  slug: 'faq',
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
        description: 'FAQ section title',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'FAQ section subtitle/description',
      },
    },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          admin: {
            description: 'FAQ question',
          },
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          admin: {
            description: 'FAQ answer (supports rich text formatting)',
          },
        },
      ],
      minRows: 1,
      maxRows: 30,
      admin: {
        components: {
          RowLabel: ({ data, index }) => {
            return data?.question || `FAQ ${String(index).padStart(2, '0')}`
          },
        },
      },
    },
  ],
}