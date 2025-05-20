const { defineConfig } = require('eslint/config');

const GDConfig = import('eslint-config-godaddy').then((mod) => mod.default || mod);

module.exports = defineConfig([
  {
    files: ['lib/**/*.js', 'test/**/*.js'],
    extends: [
      GDConfig,
    ]
  }
]);
