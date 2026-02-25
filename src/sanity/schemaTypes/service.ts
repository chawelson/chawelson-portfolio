export default {
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
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
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g., "Code2", "Search", "Smartphone")',
      options: {
        list: [
          { title: 'Code (Web Dev)', value: 'Code2' },
          { title: 'Search (SEO)', value: 'Search' },
          { title: 'Smartphone (Mobile)', value: 'Smartphone' },
          { title: 'Brain (AI)', value: 'Brain' },
          { title: 'Palette (Design)', value: 'Palette' },
          { title: 'Cloud', value: 'Cloud' },
          { title: 'Database', value: 'Database' },
          { title: 'Settings', value: 'Settings' },
          { title: 'Zap', value: 'Zap' },
          { title: 'Globe', value: 'Globe' },
          { title: 'Shield', value: 'Shield' },
          { title: 'BarChart', value: 'BarChart' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key features or technologies',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first',
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Show this service on the website',
    },
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
    },
    prepare({ title, icon }: any) {
      return {
        title,
        subtitle: `Icon: ${icon || 'None'}`,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
};
