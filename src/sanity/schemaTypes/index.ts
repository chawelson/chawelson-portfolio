import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './projectType'
import { experienceType } from './experienceType'
import post from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, experienceType, post],  // ✅ Add your types here!
}

// Remove this line if you're not using it elsewhere:
// export const schemaTypes = [projectType, experienceType]