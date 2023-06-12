import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    outDir: 'es',
    minify: true,
    rollupOptions: {
      external: [],
      input: ['index.ts'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          exports: 'named',
          dir: './dist/es',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          exports: 'named',
          dir: './dist/lib',
        },
      ],
    },
    lib: {
      entry: ['index.ts'],
    },
  },
  plugins: [
    dts({
      entryRoot: './',
      outputDir: ['./dist/types'],
    }),
  ],
})
