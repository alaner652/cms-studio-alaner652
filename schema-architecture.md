# Sanity Schema 多語言架構圖

## 整體架構說明

所有文本內容都採用 **translations 陣列** 的動態多語言架構。每個 translation 物件包含 `locale` 欄位來指定語言（zh/en），以及該語言的文本內容。

語言選項集中管理在 `translationTypes.ts`，避免在各個 schema 中寫死設定。

---

## 📦 Schema 類型

### 1️⃣ Project (專案)

```
Project Document
├─ translations (Array) [必填]
│  ├─ { locale: "zh", title, description }
│  └─ { locale: "en", title, description }
├─ category (String) [WEB/GAME/TOOL]
├─ tech (Array of Strings) - 技術棧
├─ year (Number)
├─ image (Image)
│  └─ alt (String)
├─ links (Array of Objects)
│  └─ { label, url }
└─ order (Number)
```

**說明：**
- `translations`: 包含多語言的 title 和 description
- `category`, `tech`, `year`, `image`, `links`, `order`: 語言無關的欄位
- preview 顯示預設語言（zh 或第一個 translation）的 title

---

### 2️⃣ Skill (技能)

```
Skill Document
├─ translations (Array) [必填]
│  ├─ { locale: "zh", label, description }
│  └─ { locale: "en", label, description }
├─ icon (String) - Icon 組件名稱
└─ order (Number)
```

**說明：**
- `translations`: 包含多語言的 label（技能名稱）和 description
- `icon`: 語言無關，所有語言共用相同的 icon
- preview 顯示預設語言的 label

---

### 3️⃣ Education (教育)

```
Education Document
├─ translations (Array) [必填]
│  ├─ { locale: "zh", title, items: Array<String> }
│  └─ { locale: "en", title, items: Array<String> }
└─ order (Number)
```

**說明：**
- `translations`: 包含多語言的 title 和 items（課程列表）
- 每個語言的 items 可以有不同的課程清單
- preview 顯示預設語言的 title 和項目數量

---

### 4️⃣ Hobby (興趣)

```
Hobby Document
├─ translations (Array) [必填]
│  ├─ { locale: "zh", label }
│  └─ { locale: "en", label }
├─ icon (String) - Icon 組件名稱
├─ size (String) [sm/md/lg]
└─ position (Object)
   ├─ x (Number) - X 位置百分比 (0-100)
   ├─ y (Number) - Y 位置百分比 (0-100)
   └─ rotation (Number) - 旋轉角度 (-180 to 180)
```

**說明：**
- `translations`: 包含多語言的 label（興趣名稱）
- `icon`, `size`, `position`: 語言無關的視覺設定
- preview 顯示預設語言的 label 以及位置資訊

---

### 5️⃣ Journey (歷程)

```
Journey Document
├─ year (String) - 年份標示
├─ translations (Array) [必填]
│  ├─ { locale: "zh", description }
│  └─ { locale: "en", description }
└─ order (Number)
```

**說明：**
- `year`: 語言無關，所有語言共用相同的年份顯示
- `translations`: 包含多語言的 description
- preview 顯示 year 和預設語言的 description 摘要

---

### 6️⃣ Goal (目標)

```
Goal Document
├─ translations (Array) [必填]
│  ├─ { locale: "zh", title, description }
│  └─ { locale: "en", title, description }
├─ icon (String) - Icon 組件名稱
└─ order (Number)
```

**說明：**
- `translations`: 包含多語言的 title 和 description
- `icon`: 語言無關的圖示
- preview 顯示預設語言的 title

---

### 7️⃣ FAQ (常見問題)

```
FAQ Document
├─ translations (Array) [必填]
│  ├─ { locale: "zh", question, answer }
│  └─ { locale: "en", question, answer }
├─ featured (Boolean) - 是否顯示於首頁
└─ order (Number)
```

**說明：**
- `translations`: 包含多語言的 question 和 answer
- `featured`: 語言無關，決定是否在首頁顯示
- preview 顯示預設語言的 question，featured 項目有 ✓ 標記

---

### 8️⃣ Testimonial (推薦)

```
Testimonial Document
├─ name (String) - 客戶名稱
├─ translations (Array) [必填]
│  ├─ { locale: "zh", role, quote }
│  └─ { locale: "en", role, quote }
├─ avatar (Image) - 客戶頭像
├─ rating (Number) - 評分 (1-10)
├─ featured (Boolean) - 是否顯示於首頁
└─ order (Number)
```

**說明：**
- `name`: 語言無關，客戶名稱通常不需要翻譯
- `translations`: 包含多語言的 role（職位）和 quote（推薦內容）
- `avatar`, `rating`, `featured`, `order`: 語言無關的欄位
- preview 顯示客戶名稱、預設語言的 role 和評分

---

## 🌍 支援的語言

| Locale Code | 語言 | 顯示標籤 |
|-------------|------|----------|
| `zh` | 中文 | 🇹🇼 中文 |
| `en` | English | 🇬🇧 English |

---

## 📋 通用規則

### 1. Translations 陣列結構
所有 schema 的 translations 欄位都遵循相同的結構，並使用集中管理的語言設定：

```typescript
// translationTypes.ts - 集中管理的語言設定
export const LOCALE_OPTIONS = [
  { title: '🇹🇼 中文 (Chinese)', value: 'zh' },
  { title: '🇬🇧 English', value: 'en' },
]

export const LANGUAGE_NAMES: Record<string, string> = {
  zh: '🇹🇼 中文',
  en: '🇬🇧 English',
}

// 在各個 schema 中使用
import { LOCALE_OPTIONS, LANGUAGE_NAMES } from './translationTypes'

{
  name: 'translations',
  type: 'array',
  validation: (Rule) => Rule.required().min(1),
  of: [{
    type: 'object',
    fields: [
      {
        name: 'locale',
        type: 'string',
        options: {
          list: LOCALE_OPTIONS,  // 使用共用常數，避免寫死
          layout: 'radio',
        }
      },
      // ...其他語言特定欄位
    ],
    preview: {
      prepare({ locale, ... }) {
        return {
          title: LANGUAGE_NAMES[locale] || locale,  // 使用共用常數
          // ...
        }
      }
    }
  }]
}
```

**優點：**
- 語言選項集中在 `translationTypes.ts`，只需修改一處即可更新所有 schema
- 避免在各個 schema 中寫死語言選項，提高可維護性
- 新增或移除語言時更加容易

### 2. Preview 顯示邏輯
所有 schema 的 preview 都會：
- 優先顯示中文 (zh) 的內容
- 如果沒有中文，顯示第一個可用的 translation
- 提供友善的語言標籤顯示（帶國旗表情符號）

### 3. 語言無關欄位
以下類型的欄位不需要翻譯：
- **數字**: order, year
- **媒體**: image, icon
- **連結**: links, url
- **分類**: category, size
- **位置**: position (x, y, rotation)
- **技術棧**: tech

---

## 🔄 資料查詢範例

### 前端取得指定語言的資料：

```typescript
// 在查詢時過濾出特定語言
const getTranslation = (translations: Translation[], locale: string) => {
  return translations.find(t => t.locale === locale) || translations[0];
};

// 使用範例
const project = await sanityClient.fetch(`*[_type == "project"][0]`);
const translation = getTranslation(project.translations, 'zh');
console.log(translation.title); // 顯示中文標題
```

---

## ✅ 優點

1. **彈性**: 每個文件可以有不同數量的語言版本
2. **集中管理**: 同一文件的所有語言版本都在一起，易於維護
3. **擴展性**: 未來可輕鬆新增更多語言
4. **型別安全**: 使用 TypeScript 可以確保型別一致性
5. **效能**: 一次查詢即可取得所有語言版本

---

## 📝 注意事項

1. 至少需要提供一個語言版本（`min(1)` validation）
2. 每個 translation 的 locale 應該是唯一的（避免同一語言有多個版本）
3. 語言無關的欄位（如 icon, year, order）不應該放在 translations 陣列中
4. Preview 預設顯示中文版本，確保中文內容的完整性
