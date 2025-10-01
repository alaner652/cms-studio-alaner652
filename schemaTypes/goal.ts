import { defineType } from 'sanity'

export const goalType = defineType({
  name: 'goal',
  title: 'Goal',
  type: 'document',
  fields: [
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
      title: 'title',
      description: 'description',
      icon: 'icon',
      order: 'order',
    },
    prepare({ title, description, icon, order }) {
      return {
        title: title,
        subtitle: `${icon} • Order: ${order}`,
        description: description?.substring(0, 100),
      }
    },
  },
})
