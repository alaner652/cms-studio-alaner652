import { defineType } from 'sanity'
import { LOCALE_OPTIONS, LANGUAGE_NAMES } from './translationTypes'

export const goalType = defineType({
  name: 'goal',
  title: 'Goal',
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
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Full icon component name (e.g., "FaRocket", "IoTrophy", "TbTarget")',
      validation: (Rule) =>
        Rule.required().custom((icon) => {
          if (!icon) return 'Icon is required'
          if (typeof icon !== 'string') return 'Icon must be a string'

          const validPrefixes = ['Si', 'Tb', 'Fa', 'Io', 'Md', 'Gi']
          const hasValidPrefix = validPrefixes.some((prefix) => icon.startsWith(prefix))

          if (!hasValidPrefix) {
            return `Icon must start with one of: ${validPrefixes.join(', ')}`
          }

          return true
        }),
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
      icon: 'icon',
      order: 'order',
    },
    prepare({ translations, icon, order }) {
      const defaultTranslation = translations?.find((t: any) => t.locale === 'zh') || translations?.[0]
      return {
        title: defaultTranslation?.title || 'Untitled Goal',
        subtitle: `${icon} • Order: ${order}`,
        description: defaultTranslation?.description?.substring(0, 100),
      }
    },
  },
})
