import { defineType } from "sanity";

export const skillType = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    {
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
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
      label: "label",
      description: "description",
      icon: "icon",
      order: "order",
    },
    prepare({ label, description, icon, order }) {
      return {
        title: label,
        subtitle: `${icon} • Order: ${order}`,
        description: description,
      };
    },
  },
});
