import { defineType } from "sanity";
import { LOCALE_OPTIONS, LANGUAGE_NAMES } from "./translationTypes";

const PROJECT_CATEGORIES = {
  WEB: "WEB",
  GAME: "GAME",
  TOOL: "TOOL",
} as const;

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media & Links" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    {
      name: "translations",
      title: "Translations",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "object",
          name: "translation",
          fields: [
            {
              name: "locale",
              title: "Language",
              type: "string",
              options: {
                list: LOCALE_OPTIONS,
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              locale: "locale",
              title: "title",
            },
            prepare({ locale, title }) {
              return {
                title: LANGUAGE_NAMES[locale] || locale,
                subtitle: title || "No title",
              };
            },
          },
        },
      ],
      group: "content",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Web Development", value: PROJECT_CATEGORIES.WEB },
          { title: "Game Development", value: PROJECT_CATEGORIES.GAME },
          { title: "Tool/Utility", value: PROJECT_CATEGORIES.TOOL },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      group: "content",
    },
    {
      name: "tech",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (Rule) => Rule.required().min(1),
      group: "content",
    },
    {
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(2000).max(2100),
      group: "content",
    },
    {
      name: "image",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Important for SEO and accessibility",
        },
      ],
      group: "media",
    },
    {
      name: "links",
      title: "Project Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "link",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              options: {
                list: [
                  { title: "Live Preview", value: "Live Preview" },
                  { title: "View Source", value: "View Source" },
                  { title: "View Video", value: "View Video" },
                  { title: "Documentation", value: "Documentation" },
                ],
              },
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https"],
                }),
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "url",
            },
          },
        },
      ],
      group: "media",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower = appears first",
      initialValue: 0,
      group: "settings",
    },
  ],
  preview: {
    select: {
      translations: "translations",
      category: "category",
      year: "year",
      media: "image",
    },
    prepare({ translations, category, year, media }) {
      const defaultTranslation = translations?.find((t: any) => t.locale === "zh") || translations?.[0];
      return {
        title: defaultTranslation?.title || "Untitled Project",
        subtitle: `${category} • ${year}`,
        media,
      };
    },
  },
});