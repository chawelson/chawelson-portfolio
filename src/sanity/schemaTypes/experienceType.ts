import { defineField, defineType } from 'sanity'

export const experienceType = defineType({
  name: 'experience',
  title: 'Professional Experience',
  type: 'document',
  fields: [
    defineField({ name: 'role', type: 'string', title: 'Job Title' }),
    defineField({ name: 'company', type: 'string', title: 'Company' }),
    defineField({ name: 'period', type: 'string', title: 'Dates (e.g., 2015 - Present)' }),
    defineField({ name: 'details', type: 'text', title: 'Key Responsibilities' }),
  ]
})