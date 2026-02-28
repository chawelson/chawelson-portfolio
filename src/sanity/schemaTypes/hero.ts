export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  __singleton: true,
  fields: [
    {
      name: 'greeting',
      title: 'Greeting Text',
      type: 'string',
      initialValue: "Hello, I'm",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      initialValue: 'Josh',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      initialValue: 'Chawelson',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      initialValue: 'Senior Full Stack Developer',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional. Not currently displayed on the homepage.',
    },
    {
      name: 'ctaPrimary',
      title: 'Primary CTA Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Hire Me',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          initialValue: '#contact',
        },
      ],
    },
    {
      name: 'ctaSecondary',
      title: 'Secondary CTA Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Download CV',
        },
        {
          name: 'cvFile',
          title: 'CV File',
          type: 'file',
          options: { accept: '.pdf' },
          description: 'Upload PDF only',
        },
      ],
    },
    {
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g., "15+", "50+", "200%"',
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g., "Years Experience"',
            },
          ],
        },
      ],
      description: '3 stats displayed below the CTAs',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Dribbble', value: 'dribbble' },
                  { title: 'Instagram', value: 'instagram' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      name: 'availabilityBadge',
      title: 'Availability Badge',
      type: 'object',
      fields: [
        {
          name: 'show',
          title: 'Show Badge',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'status',
          title: 'Status Text',
          type: 'string',
          initialValue: 'Available',
        },
        {
          name: 'subtext',
          title: 'Subtext',
          type: 'string',
          initialValue: 'For new projects',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'lastName',
    },
    prepare({ title, subtitle }: any) {
      return {
        title: 'Hero Section',
        subtitle: `${title} ${subtitle}`,
      };
    },
  },
};
