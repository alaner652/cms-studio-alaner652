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

      // About section
      S.listItem()
        .title("About Section")
        .child(
          S.list()
            .title("About Content")
            .items([
              S.listItem()
                .title("Skills")
                .child(
                  S.documentTypeList("skill")
                    .title("Skills")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.listItem()
                .title("Education")
                .child(
                  S.documentTypeList("education")
                    .title("Education")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.listItem()
                .title("Hobbies")
                .child(S.documentTypeList("hobby").title("Hobbies")),
              S.listItem()
                .title("Journey")
                .child(
                  S.documentTypeList("journey")
                    .title("Journey")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.listItem()
                .title("Goals")
                .child(
                  S.documentTypeList("goal")
                    .title("Goals")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
            ])
        ),

      S.divider(),

      // Add other document types here
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "project",
            "testimonial",
            "faq",
            "skill",
            "education",
            "hobby",
            "journey",
            "goal",
          ].includes(listItem.getId() || "")
      ),
    ])
