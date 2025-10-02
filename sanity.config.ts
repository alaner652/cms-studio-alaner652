import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {zhHantLocale} from '@sanity/locale-zh-hant'

import {schema} from './schemaTypes'
import {structure} from './structure'

const projectId = 'f3n56vs0'
const dataset = 'production'

export default defineConfig({
  name: 'default',
  title: 'SmallR Portfolio',

  projectId,
  dataset,

  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: '2025-09-30'}),
    zhHantLocale(),
  ],

  schema,
})
