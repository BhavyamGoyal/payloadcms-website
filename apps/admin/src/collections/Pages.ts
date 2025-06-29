import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (doc) => {
      return `${process.env.NEXT_PUBLIC_APP_URL}${doc.slug === 'home' ? '' : `/${doc.slug}`}`
    },
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        {
          slug: 'hero',
          labels: {
            singular: 'Hero',
            plural: 'Heroes',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'subtitle',
              type: 'textarea',
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'ctaButton',
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
          ],
        },
        {
          slug: 'features',
          labels: {
            singular: 'Features',
            plural: 'Features',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'subtitle',
              type: 'textarea',
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
                  type: 'text',
                },
                {
                  name: 'icon',
                  type: 'text',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          slug: 'cta',
          labels: {
            singular: 'Call to Action',
            plural: 'Call to Actions',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'button',
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
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          slug: 'testimonials',
          labels: {
            singular: 'Testimonials',
            plural: 'Testimonials',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'testimonials',
              type: 'array',
              fields: [
                {
                  name: 'quote',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'author',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'role',
                  type: 'text',
                },
                {
                  name: 'company',
                  type: 'text',
                },
                {
                  name: 'avatar',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          slug: 'pricing',
          labels: {
            singular: 'Pricing',
            plural: 'Pricing',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'subtitle',
              type: 'textarea',
            },
            {
              name: 'plans',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'period',
                  type: 'text',
                  defaultValue: 'month',
                },
                {
                  name: 'description',
                  type: 'text',
                },
                {
                  name: 'features',
                  type: 'array',
                  fields: [
                    {
                      name: 'feature',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'button',
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
                  name: 'featured',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'faq',
          labels: {
            singular: 'FAQ',
            plural: 'FAQs',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'faqs',
              type: 'array',
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'answer',
                  type: 'richText',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}