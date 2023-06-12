import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    outDir: 'es',
    minify: true,
    rollupOptions: {
      external: ['vue', 'lodash-es'],
      input: ['src/index.ts'],
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
      entry: './src/index.ts',
    },
  },
  plugins: [
    vue(),
    dts({
      entryRoot: './',
      outputDir: ['./dist/types'],
      tsConfigFilePath: './tsconfig.json',
      exclude: ['node_module/**', 'lodash-es'],
    }),
  ],
})
