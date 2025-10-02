// 通用的多語言支援型別定義

export const SUPPORTED_LOCALES = {
  ZH: "zh",
  EN: "en",
} as const;

export type Locale = (typeof SUPPORTED_LOCALES)[keyof typeof SUPPORTED_LOCALES];

// 語言選項列表 - 集中管理所有語言設定
export const LOCALE_OPTIONS = [
  { title: "中文 (Chinese)", value: "zh" },
  { title: "English", value: "en" },
];

// 語言名稱映射 - 用於 preview 顯示
export const LANGUAGE_NAMES: Record<string, string> = {
  zh: "中文",
  en: "English",
};

// 為不同的 schema 定義 translation 欄位
export const createTranslationFields = (fields: Record<string, any>[]) => ({
  name: "translations",
  title: "Translations",
  type: "array",
  validation: (Rule: any) => Rule.required().min(1),
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
          validation: (Rule: any) => Rule.required(),
        },
        ...fields,
      ],
      preview: {
        select: {
          locale: "locale",
          title: fields[0]?.name || "content",
        },
        prepare({ locale, title }: any) {
          return {
            title: LANGUAGE_NAMES[locale as Locale] || locale,
            subtitle: title || "No content",
          };
        },
      },
    },
  ],
});
