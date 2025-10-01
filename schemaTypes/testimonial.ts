import { defineType } from "sanity";

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
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    },
    {
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    },
    {
      name: "role",
      title: "Role / Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    },
    {
      name: "quote",
      title: "Testimonial",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().min(10),
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
      role: "role",
      quote: "quote",
      media: "avatar",
      rating: "rating",
      featured: "featured",
    },
    prepare({ name, role, quote, media, rating, featured }) {
      const stars = "⭐".repeat(Math.floor(rating / 2));
      const icon = featured ? "✓ " : "";
      return {
        title: `${icon}${name}`,
        subtitle: `${role} • ${stars} ${rating}/10`,
        description: quote?.substring(0, 100) + "...",
        media,
      };
    },
  },
});