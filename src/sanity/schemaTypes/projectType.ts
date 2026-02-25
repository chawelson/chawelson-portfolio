import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Portfolio Projects',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Project Name' }),
    defineField({ name: 'client', type: 'string', title: 'Client (e.g., Coca-Cola, MTN)' }),
    defineField({ name: 'achievement', type: 'string', title: 'Impact (e.g., "4M+ users impacted")' }),
    defineField({ name: 'techStack', type: 'array', of: [{type: 'string'}], title: 'Tech Stack' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true }, title: 'Project Image' }),
  ]
})