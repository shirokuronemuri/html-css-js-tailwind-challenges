import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import fastglob from "fast-glob";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getEndpoints(): Record<string, string> {
  const endpointStrings = fastglob.sync("src/**/*.html");
  const endpoints: Record<string, string> = {};
  for (const endpoint of endpointStrings) {
    const name = endpoint
      .replace(/^src\//, "")
      .replace(/\.html$/, "")
      .split("/")
      .join("-");

    endpoints[name] = resolve(__dirname, endpoint);
  }
  return endpoints;
}

export default defineConfig({
  root: "src",
  appType: "mpa",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: getEndpoints(),
    },
  },
  plugins: [tailwindcss()],
});
