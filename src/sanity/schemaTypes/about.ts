export default {
  name: 'about',
  title: 'About Section',
  type: 'document',
  __singleton: true,
  fields: [
    {
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string',
      initialValue: 'About Me',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Professional Problem Solutions For Digital Products',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'paragraph1',
      title: 'Paragraph 1',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'paragraph2',
      title: 'Paragraph 2',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'About Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image displayed in the About section',
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Award', value: 'Award' },
                  { title: 'Users', value: 'Users' },
                  { title: 'Trending Up', value: 'TrendingUp' },
                  { title: 'Briefcase', value: 'Briefcase' },
                  { title: 'Star', value: 'Star' },
                  { title: 'Target', value: 'Target' },
                ],
              },
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
            },
          ],
        },
      ],
      description: '3 highlight cards displayed below the text',
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Learn More About Me',
    },
    {
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      initialValue: '#services',
    },
  ],
  preview: {
    select: {
      title: 'sectionLabel',
    },
  },
};
