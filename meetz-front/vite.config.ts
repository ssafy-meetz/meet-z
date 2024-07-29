import { defineConfig,loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({

  server:{
    host: '0.0.0.0',
    port:3000,
    proxy:{
      '/api':{
        target: 'https://i11c108.p.ssafy.io/',
        changeOrigin:true,
      }
    }
  },
  plugins: [react()],
});
