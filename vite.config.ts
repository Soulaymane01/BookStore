import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { GiPlatform, GiThrownSpear } from 'react-icons/gi';
import { Badge, Server } from 'lucide-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
