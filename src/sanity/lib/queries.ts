import { defineQuery } from 'next-sanity'

export const DATA_QUERY = defineQuery(`
  {
    "projects": *[_type == "project"] | order(_createdAt desc),
    "experience": *[_type == "experience"] | order(_createdAt desc)
  }
`)