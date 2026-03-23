/**
 * Style Dictionary Configuration
 * Transforms design tokens into CSS custom properties, JS constants, and more.
 */

const StyleDictionary = require('style-dictionary');

// ── Custom transforms ─────────────────────────────────────────────────────────

StyleDictionary.registerTransform({
  name: 'name/kebab',
  type: 'name',
  transformer: (token) =>
    token.path
      .join('-')
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-'),
});

// ── Config ────────────────────────────────────────────────────────────────────

module.exports = {
  source: ['src/tokens/style-dictionary/**/*.json'],

  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['attribute/cti', 'name/cti/kebab', 'color/hsl'],
      buildPath: 'dist/tokens/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      transforms: ['attribute/cti', 'name/cti/camel', 'color/hex'],
      buildPath: 'dist/tokens/',
      files: [
        {
          destination: 'index.js',
          format: 'javascript/es6',
        },
        {
          destination: 'index.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/tokens/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
        },
      ],
    },
  },
};
