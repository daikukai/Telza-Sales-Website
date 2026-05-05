// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // example: keep other imports you need

export default defineConfig({
  // ...your existing config
});
const base = process.env.BASE_PATH ?? "/";
export default defineConfig({
  base,
  // ...
});
