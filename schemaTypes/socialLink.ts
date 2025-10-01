import { defineType } from 'sanity'
import { LOCALE_OPTIONS, LANGUAGE_NAMES } from './translationTypes'

export const socialLinkType = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https', 'mailto'],
        }),
      description: 'Full URL to your social media profile or website',
      group: 'content',
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
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Display name for this link (e.g., "GitHub", "My Portfolio")',
            },
            {
              name: 'description',
              title: 'Description (Optional)',
              type: 'string',
              description: 'Short description or tooltip text',
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
      group: 'content',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name from react-icons. Examples: "FaGithub", "SiLinkedin", "TbBrandTwitter"',
      placeholder: 'e.g., FaGithub',
      validation: (Rule) =>
        Rule.required().custom((icon) => {
          if (typeof icon !== 'string') return 'Icon must be a string'

          const validPrefixes = ['Si', 'Tb', 'Fa', 'Io', 'Md', 'Gi', 'Bs', 'Ai']
          const hasValidPrefix = validPrefixes.some((prefix) => icon.startsWith(prefix))

          if (!hasValidPrefix) {
            return `Icon must start with one of: ${validPrefixes.join(', ')}. Example: "FaGithub"`
          }

          return true
        }),
      group: 'settings',
    },
    {
      name: 'showInHero',
      title: 'Show in Hero Section',
      type: 'boolean',
      initialValue: true,
      description: 'Display this link in the hero/header section',
      group: 'settings',
    },
    {
      name: 'showInFooter',
      title: 'Show in Footer',
      type: 'boolean',
      initialValue: true,
      description: 'Display this link in the footer section',
      group: 'settings',
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to hide/show this link everywhere',
      group: 'settings',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower = appears first',
      initialValue: 0,
      group: 'settings',
    },
  ],
  preview: {
    select: {
      translations: 'translations',
      url: 'url',
      showInHero: 'showInHero',
      showInFooter: 'showInFooter',
      isActive: 'isActive',
    },
    prepare({ translations, url, showInHero, showInFooter, isActive }) {
      const defaultTranslation = translations?.find((t: any) => t.locale === 'zh') || translations?.[0]
      const label = defaultTranslation?.label || 'Untitled'

      // 顯示位置標記
      const locations = []
      if (showInHero) locations.push('Hero')
      if (showInFooter) locations.push('Footer')
      const locationText = locations.length > 0 ? `[${locations.join(', ')}]` : '[Hidden]'

      // 狀態標記
      const statusIcon = isActive ? 'Active' : 'Inactive'

      return {
        title: `${label} (${statusIcon})`,
        subtitle: `${locationText} • ${url}`,
      }
    },
  },
})
