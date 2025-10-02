import { type SchemaTypeDefinition } from 'sanity'
import { heroType } from './hero'
import { projectType } from './project'
import { testimonialType } from './testimonial'
import { faqType } from './faq'
import { skillType } from './skill'
import { educationType } from './education'
import { hobbyType } from './hobby'
import { journeyType } from './journey'
import { goalType } from './goal'
import { socialLinkType } from './socialLink'
import { blogType } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroType,
    projectType,
    testimonialType,
    faqType,
    skillType,
    educationType,
    hobbyType,
    journeyType,
    goalType,
    socialLinkType,
    blogType,
  ],
}
