import project from './project';
import blogPost from './blogPost';
import testimonial from './testimonial';
import author from './author';
import experience from './experience';
import service from './service';
import company from './company';
import about from './about';
import hero from './hero';

export const schemas = [
  project,
  blogPost,
  testimonial,
  author,
  experience,
  service,
  company,
  about,
  hero,
];

export const schema = {
  types: schemas,
};

export default schemas;
