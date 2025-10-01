import { defineType } from 'sanity'

export const educationType = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
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
      items: 'items',
      order: 'order',
    },
    prepare({ title, items, order }) {
      const itemCount = items?.length || 0
      return {
        title: title,
        subtitle: `${itemCount} item${itemCount !== 1 ? 's' : ''} • Order: ${order}`,
      }
    },
  },
})
