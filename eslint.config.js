import js from '@eslint/js'
export default [js.configs.recommended, { files: ['src/**/*.{ts,vue}'], rules: { 'no-unused-vars': 'warn' } }]
