import type { GlobalConfig } from 'payload'
import { adminOrEditor } from '../../access/roles'

export const Testimonials: GlobalConfig = {
  slug: 'testimonials',
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
        description: 'Testimonials section title',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'Testimonials section subtitle/description',
      },
    },
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Customer name',
          },
        },
        {
          name: 'position',
          type: 'text',
          admin: {
            description: 'Customer position/title',
          },
        },
        {
          name: 'company',
          type: 'text',
          admin: {
            description: 'Customer company',
          },
        },
        {
          name: 'testimonial',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Testimonial text',
          },
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Customer avatar/photo',
          },
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          admin: {
            description: 'Star rating (1-5)',
          },
        },
      ],
      minRows: 1,
      maxRows: 20,
      admin: {
        components: {
          RowLabel: ({ data, index }) => {
            return data?.name || `Testimonial ${String(index).padStart(2, '0')}`
          },
        },
      },
    },
  ],
}