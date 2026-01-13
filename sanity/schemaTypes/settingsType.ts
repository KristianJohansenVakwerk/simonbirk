import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const settingsType = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {
        collapsed: true,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'seoTitle',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'seoDescription',
          title: 'Description',
          type: 'string',
        }),
        defineField({
          name: 'seoImage',
          title: 'Image',
          type: 'image',
        }),
        defineField({
          name: 'seoUrl',
          title: 'URL',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'info',
      type: 'array',
      title: 'Info',
      of: [
        defineArrayMember({
          name: 'item',
          title: 'Info Item',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'title', type: 'string' }),
            defineField({
              name: 'hrefLabel',
              title: 'Href Label',
              type: 'string',
            }),
            defineField({
              name: 'href',
              type: 'url',
              description:
                'Optional link for the label, leave blank for the items without URLs',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return { ...selection };
    },
  },
});
