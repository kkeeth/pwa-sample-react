import path from 'node:path';

// https://vitejs.dev/config/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        sourcemap: true,
        skipWaiting: true,
        clientsClaim: true,
        cacheId: 'my-pwa-app',
        swDest: path.join(path.join(process.cwd(), 'dist'), 'sw.js'),
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        globDirectory: './dist/',
        importScripts: ['firebase-messaging-sw.js'],
      },
      manifest: {
        name: 'My PWA App',
        display: "standalone",
        short_name: 'MyPWA',
        description: 'My awesome PWA app description',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        shortcuts: [
          {
            name: "ホーム",
            short_name: "home",
            description: "ゲームをします",
            url: "/",
            icons: [{ src: "./shortcuts/home-256.png", sizes: "256x256" }]
          },
          {
            name: "ランキング",
            short_name: "rank",
            description: "ランキングを見ます",
            url: "/setting.html",
            icons: [{ src: "./shortcuts/ranking-256.png", sizes: "256x256" }]
          },
        ]
      },
    }),
  ]
});