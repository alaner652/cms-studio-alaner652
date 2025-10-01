import { defineType } from "sanity";
import { LOCALE_OPTIONS, LANGUAGE_NAMES } from "./translationTypes";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    {
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    },
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
              name: "role",
              title: "Role / Job Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "quote",
              title: "Testimonial",
              type: "text",
              rows: 5,
              validation: (Rule) => Rule.required().min(10),
            },
          ],
          preview: {
            select: {
              locale: "locale",
              role: "role",
            },
            prepare({ locale, role }) {
              return {
                title: LANGUAGE_NAMES[locale] || locale,
                subtitle: role || "No role",
              };
            },
          },
        },
      ],
      group: "content",
    },
    {
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "content",
    },
    {
      name: "rating",
      title: "Rating (1-10)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(10).integer(),
      initialValue: 10,
      group: "settings",
    },
    {
      name: "featured",
      title: "⭐ Show on Homepage",
      type: "boolean",
      initialValue: true,
      group: "settings",
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
      name: "name",
      translations: "translations",
      media: "avatar",
      rating: "rating",
      featured: "featured",
    },
    prepare({ name, translations, media, rating, featured }) {
      const defaultTranslation = translations?.find((t: any) => t.locale === "zh") || translations?.[0];
      const stars = "⭐".repeat(Math.floor(rating / 2));
      const icon = featured ? "✓ " : "";
      return {
        title: `${icon}${name}`,
        subtitle: `${defaultTranslation?.role || "No role"} • ${stars} ${rating}/10`,
        description: defaultTranslation?.quote?.substring(0, 100) + "...",
        media,
      };
    },
  },
});