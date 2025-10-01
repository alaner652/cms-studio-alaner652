import { defineType } from 'sanity'
import { LOCALE_OPTIONS, LANGUAGE_NAMES } from './translationTypes'

export const hobbyType = defineType({
  name: 'hobby',
  title: 'Hobby',
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
              name: 'label',
              title: 'Hobby Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              locale: 'locale',
              label: 'label',
            },
            prepare({ locale, label }) {
              return {
                title: LANGUAGE_NAMES[locale] || locale,
                subtitle: label || 'No label',
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
      description: 'Full icon component name (e.g., "FaCamera", "IoGameController", "TbMusic")',
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
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
        ],
        layout: 'radio',
      },
      initialValue: 'md',
    },
    {
      name: 'position',
      title: 'Position',
      type: 'object',
      description: 'Position on the canvas (percentage-based)',
      fields: [
        {
          name: 'x',
          title: 'X Position (%)',
          type: 'number',
          validation: (Rule) => Rule.required().min(0).max(100),
          initialValue: 50,
        },
        {
          name: 'y',
          title: 'Y Position (%)',
          type: 'number',
          validation: (Rule) => Rule.required().min(0).max(100),
          initialValue: 50,
        },
        {
          name: 'rotation',
          title: 'Rotation (degrees)',
          type: 'number',
          validation: (Rule) => Rule.min(-180).max(180),
          initialValue: 0,
        },
      ],
    },
  ],
  preview: {
    select: {
      translations: 'translations',
      icon: 'icon',
      size: 'size',
      x: 'position.x',
      y: 'position.y',
    },
    prepare({ translations, icon, size, x, y }) {
      const defaultTranslation = translations?.find((t: any) => t.locale === 'zh') || translations?.[0]
      return {
        title: `${defaultTranslation?.label || 'Untitled Hobby'} (${size})`,
        subtitle: `${icon} • Position: (${x}%, ${y}%)`,
      }
    },
  },
})
