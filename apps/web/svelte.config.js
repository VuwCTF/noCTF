import adapter from "@sveltejs/adapter-cloudflare";

export default {
  kit: {
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: "dist",
      assets: "dist",
      runes: true,
      precompress: false,
      strict: true,
      fallback: "index.html",
    }),
  },
  vite: {
    server: {
      proxy: {
        // "/api": "http://localhost:8000",
        "/api": "https://api.2026.vuwctf.com:8000",
      },
    },
  },
};
