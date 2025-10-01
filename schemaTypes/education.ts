import { defineType } from 'sanity'
import { LOCALE_OPTIONS, LANGUAGE_NAMES } from './translationTypes'

export const educationType = defineType({
  name: 'education',
  title: 'Education',
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
              validation: (Rule) => Rule.required(),
              description: 'e.g., "Computer Science", "Web Development"',
            },
            {
              name: 'items',
              title: 'Courses/Items',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required().min(1),
              description: 'List of courses or learning items',
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
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower = appears first',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      translations: 'translations',
      order: 'order',
    },
    prepare({ translations, order }) {
      const defaultTranslation = translations?.find((t: any) => t.locale === 'zh') || translations?.[0]
      const itemCount = defaultTranslation?.items?.length || 0
      return {
        title: defaultTranslation?.title || 'Untitled Education',
        subtitle: `${itemCount} item${itemCount !== 1 ? 's' : ''} • Order: ${order}`,
      }
    },
  },
})
