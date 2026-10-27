import { buildLegacyTheme } from 'sanity'

export const rotensTheme = buildLegacyTheme({
  '--black': '#1c2b1e',
  '--white': '#ffffff',

  '--gray': '#6b7a6d',
  '--gray-base': '#6b7a6d',

  '--component-bg': '#ffffff',
  '--component-text-color': '#1c2b1e',

  '--brand-primary': '#344E41',

  '--default-button-color': '#6b7a6d',
  '--default-button-primary-color': '#344E41',
  '--default-button-success-color': '#588157',
  '--default-button-warning-color': '#d97706',
  '--default-button-danger-color': '#dc2626',

  '--state-info-color': '#344E41',
  '--state-success-color': '#588157',
  '--state-warning-color': '#d97706',
  '--state-danger-color': '#dc2626',

  '--main-navigation-color': '#344E41',
  '--main-navigation-color--inverted': '#ffffff',

  '--focus-color': '#588157',
})
