import { defineType } from "sanity";
import { LOCALE_OPTIONS, LANGUAGE_NAMES } from "./translationTypes";

export const faqType = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
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
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required().min(10),
            },
          ],
          preview: {
            select: {
              locale: "locale",
              question: "question",
            },
            prepare({ locale, question }) {
              return {
                title: LANGUAGE_NAMES[locale] || locale,
                subtitle: question || "No question",
              };
            },
          },
        },
      ],
      group: "content",
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
      order: "order",
    },
    prepare({ translations, order }) {
      const defaultTranslation = translations?.find((t: any) => t.locale === "zh") || translations?.[0];
      return {
        title: defaultTranslation?.question || "Untitled FAQ",
        subtitle: `Order: ${order} • ${defaultTranslation?.answer?.substring(0, 80) || ""}...`,
      };
    },
  },
});