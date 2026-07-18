import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiProxyTarget = env.VITE_API_PROXY_TARGET || 'https://localhost:7267';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      allowedHosts: true,
      proxy: {
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
          secure: false,
        },
      },
      watch: {
        usePolling: true,
      },
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
    },
  };
});
