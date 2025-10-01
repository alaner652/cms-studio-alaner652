import { defineType } from 'sanity'

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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
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
      description: 'description',
      order: 'order',
    },
    prepare({ year, description, order }) {
      return {
        title: year,
        subtitle: `Order: ${order} • ${description?.substring(0, 60)}${description?.length > 60 ? '...' : ''}`,
      }
    },
  },
})
