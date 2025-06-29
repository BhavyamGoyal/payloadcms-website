import type { GlobalConfig } from 'payload'
import { adminOrEditor } from '../../access/roles'

export const Pricing: GlobalConfig = {
  slug: 'pricing',
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
        description: 'Pricing section title',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'Pricing section subtitle/description',
      },
    },
    {
      name: 'plans',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Plan name (e.g., "Basic", "Pro", "Enterprise")',
          },
        },
        {
          name: 'price',
          type: 'text',
          required: true,
          admin: {
            description: 'Plan price (e.g., "$9", "$29", "Contact Us")',
          },
        },
        {
          name: 'period',
          type: 'text',
          admin: {
            description: 'Billing period (e.g., "/month", "/year")',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Plan description',
          },
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            },
            {
              name: 'included',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Is this feature included in the plan?',
              },
            },
          ],
          admin: {
            components: {
              RowLabel: ({ data, index }) => {
                return data?.feature || `Feature ${String(index).padStart(2, '0')}`
              },
            },
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          defaultValue: 'Get Started',
          admin: {
            description: 'Call-to-action button text',
          },
        },
        {
          name: 'buttonUrl',
          type: 'text',
          admin: {
            description: 'Call-to-action button URL',
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Highlight this plan as featured/popular',
          },
        },
      ],
      minRows: 1,
      maxRows: 6,
      admin: {
        components: {
          RowLabel: ({ data, index }) => {
            return data?.name || `Plan ${String(index).padStart(2, '0')}`
          },
        },
      },
    },
  ],
}