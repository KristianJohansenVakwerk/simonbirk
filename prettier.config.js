/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
  printWidth: 80,
  singleAttributePerLine: true,
}