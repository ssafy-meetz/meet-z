import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode
  const env = loadEnv(mode, process.cwd());

  // Common configuration
  const config = {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_LOCAL_URL || 'http://i11c108.p.ssafy.io',
          changeOrigin: true,
        },
        '/ws': {
          target: env.VITE_WS_URL || 'wss://i11c108.p.ssafy.io',
          ws: true,
          changeOrigin: true,
          secure: true,  // HTTPS를 사용하도록 설정
        },
      },
    } as any,
  };

  // Remove HMR configuration for production
  if (mode !== 'local') {
    delete config.server.hmr;
  }

  return config;
});
