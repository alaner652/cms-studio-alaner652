import { defineType } from 'sanity'
import { LOCALE_OPTIONS, LANGUAGE_NAMES } from './translationTypes'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'translations',
      title: 'Translations',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'translation',
          fields: [
            {
              name: 'locale',
              title: 'Language',
              type: 'string',
              options: {
                list: LOCALE_OPTIONS,
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Main hero title (e.g., "Student Developer small R")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'subtitle',
              title: 'Subtitle',
              type: 'text',
              rows: 2,
              description: 'Hero subtitle/tagline',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              locale: 'locale',
              title: 'title',
            },
            prepare({ locale, title }) {
              return {
                title: LANGUAGE_NAMES[locale] || locale,
                subtitle: title || 'No title',
              }
            },
          },
        },
      ],
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Only one hero should be active at a time',
    },
  ],
  preview: {
    select: {
      translations: 'translations',
      isActive: 'isActive',
    },
    prepare({ translations, isActive }) {
      const defaultTranslation = translations?.find((t: any) => t.locale === 'zh') || translations?.[0]
      const statusIcon = isActive ? '✓ ' : '✗ '
      return {
        title: `${statusIcon}${defaultTranslation?.title || 'Untitled Hero'}`,
        subtitle: defaultTranslation?.subtitle || 'No subtitle',
      }
    },
  },
})
