import { defineType } from 'sanity'
import { LOCALE_OPTIONS, LANGUAGE_NAMES } from './translationTypes'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any) => {
          const enTranslation = doc.translations?.find((t: any) => t.locale === 'en')
          return enTranslation?.title || 'untitled'
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
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
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'excerpt',
              title: 'Excerpt',
              type: 'text',
              rows: 3,
              description: 'Short description for listing page',
            },
            {
              name: 'content',
              title: 'Content (Markdown)',
              type: 'text',
              rows: 20,
              description: 'Paste your markdown content here',
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
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle to publish/unpublish this post',
    },
  ],
  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedDateDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date (Oldest)',
      name: 'publishedDateAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      translations: 'translations',
      coverImage: 'coverImage',
      isPublished: 'isPublished',
      publishedAt: 'publishedAt',
    },
    prepare({ translations, coverImage, isPublished, publishedAt }) {
      const defaultTranslation = translations?.find((t: any) => t.locale === 'zh') || translations?.[0]
      const statusIcon = isPublished ? '✓ ' : '✗ '
      return {
        title: `${statusIcon}${defaultTranslation?.title || 'Untitled Post'}`,
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date',
        media: coverImage,
      }
    },
  },
})
