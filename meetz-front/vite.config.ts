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
          target: env.VITE_API_LOCAL_URL || 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    }as any,
  };

  // Remove HMR configuration for production
  if (mode !== 'local') {
    delete config.server.hmr;
  }

  return config;
});
