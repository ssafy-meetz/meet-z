import { defineConfig,loadEnv,UserConfig } from 'vite';
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
},
};

// Add HMR configuration for production
if (env.VITE_MODE != 'local') {
(config.server as any).hmr = {
host: env.VITE_PUBLIC_URL.replace('https://', ''),
port: 443,
protocol: 'wss',
};
}

return config;
});