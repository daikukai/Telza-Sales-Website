// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // example: keep other imports you need

const base = process.env.BASE_PATH ?? "/";
export default defineConfig({
  base,
  // ...
});
