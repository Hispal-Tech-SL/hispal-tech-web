import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      // Two HTML entries with the same app: /hispalgym gets its own title, description and share image
      // (social networks read the HTML without running the app). public/_redirects routes /hispalgym to it.
      input: {
        main: path.resolve(__dirname, "index.html"),
        hispalgym: path.resolve(__dirname, "hispalgym.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
