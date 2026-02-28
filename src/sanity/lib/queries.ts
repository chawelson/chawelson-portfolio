import {defineQuery} from 'next-sanity'

export const HOME_QUERY = defineQuery(`
{
  "hero": *[_type == "hero"][0]{
    greeting,
    firstName,
    lastName,
    title,
    description,
    ctaPrimary,
    ctaSecondary,
    "cvUrl": ctaSecondary.cvFile.asset->url,
    stats,
    socialLinks,
    availabilityBadge
  },
  "about": *[_type == "about"][0]{
    sectionLabel,
    headline,
    paragraph1,
    paragraph2,
    "imageUrl": image.asset->url,
    highlights,
    ctaText,
    ctaLink
  },
  "experience": *[_type == "experience" && coalesce(isActive, true)] | order(order asc){
    _id,
    period,
    company,
    role,
    description,
    achievements
  },
  "services": *[_type == "service" && coalesce(isActive, true)] | order(order asc){
    _id,
    title,
    description,
    icon,
    features
  },
  "projects": *[_type == "project"] | order(order asc, publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    tech,
    link,
    featured,
    "imageUrl": image.asset->url
  },
  "testimonials": *[_type == "testimonial" && coalesce(isActive, true)] | order(order asc){
    _id,
    name,
    role,
    quote,
    rating,
    "imageUrl": image.asset->url
  },
  "companies": *[_type == "company" && coalesce(isActive, true)] | order(order asc){
    _id,
    name,
    website,
    "logoUrl": logo.asset->url
  },
  "recentPosts": *[_type == "blogPost"] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    readTime,
    publishedAt,
    "imageUrl": image.asset->url
  }
}
`)

export const BLOG_LIST_QUERY = defineQuery(`*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  readTime,
  publishedAt
}`)

export const BLOG_POST_QUERY = defineQuery(`*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  excerpt,
  image,
  content,
  publishedAt,
  "authorName": author->name
}`)

export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  title,
  category,
  description,
  tech,
  link,
  publishedAt,
  "imageUrl": image.asset->url
}`)
