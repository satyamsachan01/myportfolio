import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * npm run build        → dist/      Hosting with clean URLs (/projects/kursilo). Needs SPA fallback (included).
 * npm run build:site   → website/   Plain files: index.html + assets/ + projects/.
 *                                   Opens by double-click in Chrome and uploads to any hosting (URLs like #/projects/kursilo).
 */
export default defineConfig(({ mode, isSsrBuild }) => {
  const site = mode === 'site';
  return {
    base: site ? './' : '/',
    plugins: [react()],
    define: site ? { 'import.meta.env.VITE_ROUTER': JSON.stringify('hash') } : {},
    build: {
      target: 'es2020',
      outDir: site ? 'website' : 'dist',
      chunkSizeWarningLimit: 2500,
      // the SSR bundle only renders the crawlable HTML; it doesn't need the public folder
      copyPublicDir: !isSsrBuild,
      rollupOptions: site
        ? { output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'assets/portfolio.js', assetFileNames: 'assets/[name][extname]' } }
        : {},
    },
  };
});
