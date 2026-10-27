import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {rotensTheme} from './src/theme'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {assist} from '@sanity/assist'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Rotens Trädgård',

  projectId,
  dataset,

  theme: rotensTheme,

  plugins: [
    structureTool({structure}),
    unsplashImageAsset(),
    assist(),
  ],

  schema: {
    types: schemaTypes,
  },
})
