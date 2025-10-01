import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './project'
import { testimonialType } from './testimonial'
import { faqType } from './faq'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, testimonialType, faqType],
}
