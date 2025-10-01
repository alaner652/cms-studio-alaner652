import { defineType } from 'sanity'
import { LOCALE_OPTIONS, LANGUAGE_NAMES } from './translationTypes'

export const journeyType = defineType({
  name: 'journey',
  title: 'Journey',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "2024", "2023-2024"',
    },
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
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              locale: 'locale',
              description: 'description',
            },
            prepare({ locale, description }) {
              return {
                title: LANGUAGE_NAMES[locale] || locale,
                subtitle: description?.substring(0, 50) || 'No description',
              }
            },
          },
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower = appears first (typically chronological)',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      year: 'year',
      translations: 'translations',
      order: 'order',
    },
    prepare({ year, translations, order }) {
      const defaultTranslation = translations?.find((t: any) => t.locale === 'zh') || translations?.[0]
      const description = defaultTranslation?.description
      return {
        title: year,
        subtitle: `Order: ${order} • ${description?.substring(0, 60)}${description?.length > 60 ? '...' : ''}`,
      }
    },
  },
})
