
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    vuetify()
  ],
  define: {
    'process.env': {
      APP_VERSION : JSON.stringify(require('./package.json').version),
      CHANNEL : 'Dev'
    }
  },
  rollupOptions: {
  	output: {
  	  inlineDynamicImports: true
  	}
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'splashscreen.html': resolve(__dirname, 'splashscreen.html'),

      }
    },
    target: [
      'edge89',
      'safari15',
    ]
  }

});
