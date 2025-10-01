import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './project'
import { testimonialType } from './testimonial'
import { faqType } from './faq'
import { skillType } from './skill'
import { educationType } from './education'
import { hobbyType } from './hobby'
import { journeyType } from './journey'
import { goalType } from './goal'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    projectType,
    testimonialType,
    faqType,
    skillType,
    educationType,
    hobbyType,
    journeyType,
    goalType,
  ],
}
