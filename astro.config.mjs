import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  site: "https://example.com",
  devToolbar: {
    enabled: true
  },
  vite: {
    server: {
      allowedHosts: ["vps-jp.tail4b5213.ts.net"]
    },
    preview: {
      allowedHosts: ["vps-jp.tail4b5213.ts.net"]
    }
  }
});
