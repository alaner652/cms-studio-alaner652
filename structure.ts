import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Projects section
      S.listItem()
        .title("Projects")
        .child(
          S.documentTypeList("project")
            .title("Projects")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      S.divider(),

      // Testimonials section
      S.listItem()
        .title("Testimonials")
        .child(
          S.documentTypeList("testimonial")
            .title("Testimonials")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      S.divider(),

      // FAQ section
      S.listItem()
        .title("FAQ")
        .child(
          S.documentTypeList("faq")
            .title("FAQ")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      S.divider(),

      // Add other document types here
      ...S.documentTypeListItems().filter(
        (listItem) => !["project", "testimonial", "faq"].includes(listItem.getId() || "")
      ),
    ])
