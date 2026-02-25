import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ 
      name: 'slug', 
      type: 'slug', 
      title: 'URL Slug',
      options: { source: 'title', maxLength: 96 }
    }),
    defineField({ 
      name: 'mainImage', 
      type: 'image', 
      title: 'Feature Image', 
      options: { hotspot: true } 
    }),
    defineField({ name: 'summary', type: 'text', title: 'Post Summary (SEO)' }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' }, // Standard text
        { 
          type: 'image', 
          title: 'Inline Image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }]
        },
        {
          name: 'gallery',
          type: 'object',
          title: 'Image Gallery',
          fields: [
            {
              name: 'images',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }]
            }
          ]
        },
        {
          name: 'videoEmbed',
          type: 'object',
          title: 'Video Embed',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Video URL (YouTube, Vimeo, TikTok)',
              description: 'Paste the link to the video'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      initialValue: () => new Date().toISOString()
    })
  ]
})