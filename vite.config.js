import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from '@vuetify/vite-plugin';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
      theme:{
        dark:true
      }
      
    })
  ],
  define: {
    'process.env': {}
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
