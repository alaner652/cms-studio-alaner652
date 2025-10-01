import { defineType } from "sanity";

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
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    },
    {
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    },
    {
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(10),
      group: "content",
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
      question: "question",
      answer: "answer",
      featured: "featured",
    },
    prepare({ question, answer, featured }) {
      const icon = featured ? "✓ " : "";
      return {
        title: `${icon}${question}`,
        subtitle: answer?.substring(0, 100) + "...",
      };
    },
  },
});