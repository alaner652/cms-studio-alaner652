import { defineType } from "sanity";
import { LOCALE_OPTIONS, LANGUAGE_NAMES } from "./translationTypes";

export const skillType = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
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
              name: "label",
              title: "Skill Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              locale: "locale",
              label: "label",
            },
            prepare({ locale, label }) {
              return {
                title: LANGUAGE_NAMES[locale] || locale,
                subtitle: label || "No label",
              };
            },
          },
        },
      ],
    },
    {
      name: "icon",
      title: "Icon Name",
      type: "string",
      description:
        'Full icon component name (e.g., "SiNextdotjs", "SiReact", "FaRocket"). Supports Si (Simple Icons), Tb (Tabler), and Fa (Font Awesome) prefixes.',
      validation: (Rule) =>
        Rule.required().custom((icon) => {
          if (!icon) return "Icon is required";
          if (typeof icon !== "string") return "Icon must be a string";

          const validPrefixes = ["Si", "Tb", "Fa"];
          const hasValidPrefix = validPrefixes.some((prefix) =>
            icon.startsWith(prefix)
          );

          if (!hasValidPrefix) {
            return `Icon must start with one of: ${validPrefixes.join(", ")}. Example: "SiReact"`;
          }

          return true;
        }),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower = appears first",
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      translations: "translations",
      icon: "icon",
      order: "order",
    },
    prepare({ translations, icon, order }) {
      const defaultTranslation = translations?.find((t: any) => t.locale === "zh") || translations?.[0];
      return {
        title: defaultTranslation?.label || "Untitled Skill",
        subtitle: `${icon} • Order: ${order}`,
        description: defaultTranslation?.description,
      };
    },
  },
});
