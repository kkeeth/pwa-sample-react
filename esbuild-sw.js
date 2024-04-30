import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/sw.ts"],
    outfile: "public/firebase-messaging-sw.js",
    bundle: true,
    minify: true,
    sourcemap: false,
    define: {
      "process.env.VITE_FIREBASE_API_KEY": JSON.stringify(
        process.env.VITE_FIREBASE_API_KEY,
      ),
      "process.env.VITE_FIREBASE_AUTH_DOMAIN": JSON.stringify(
        process.env.VITE_FIREBASE_AUTH_DOMAIN,
      ),
      "process.env.VITE_FIREBASE_PROJECT_ID": JSON.stringify(
        process.env.VITE_FIREBASE_PROJECT_ID,
      ),
      "process.env.VITE_FIREBASE_STORAGE_BUCKET": JSON.stringify(
        process.env.VITE_FIREBASE_STORAGE_BUCKET,
      ),
      "process.env.VITE_FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
        process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      ),
      "process.env.VITE_FIREBASE_APP_ID": JSON.stringify(
        process.env.VITE_FIREBASE_APP_ID,
      ),
      "process.env.VITE_FIREBASE_VAPID_KEY": JSON.stringify(
        process.env.VITE_FIREBASE_VAPID_KEY,
      ),
    },
    platform: "browser",
    target: ["esnext"],
  })
  .catch(() => process.exit(1));
