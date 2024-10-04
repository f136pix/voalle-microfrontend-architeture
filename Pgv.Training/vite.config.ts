import dns from "dns"
import { defineConfig, loadEnv } from "vite"
import EnvironmentPlugin from "vite-plugin-environment"
import tsconfigPaths from "vite-tsconfig-paths"

import federation from "@originjs/vite-plugin-federation"
import react from "@vitejs/plugin-react"

import packageData from "./package.json" assert { type: "json" }

dns.setDefaultResultOrder("verbatim")

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  const isProduction = !!(env.NODE_ENV === "production")

  const appName = packageData.name

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      federation({
        name: appName,
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/main.tsx",
        },
        remotes: {
          "pgv-mfe-base": {
            external: isProduction
              ? "../../pgv-mfe-base/assets/remoteEntry.js"
              : env.REACT_APP_REMOTE_MFE_BASE_URL,
            externalType: "url",
            format: "esm",
            from: "vite",
          },
        },
        shared: {
          react: "*",
          "react-dom": "*",
          "react-router-dom": "*",
          zustand: "*",
        },
      }),
      EnvironmentPlugin("all", { prefix: "VITE_APP_" }),
      EnvironmentPlugin("all", { prefix: "REACT_APP_" }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: true,
      cssCodeSplit: false,
      cssMinify: true,
      assetsInlineLimit: 100000,
    },
    server: {
      port: +env.REACT_APP_PORT,
    },
    preview: {
      port: +env.REACT_APP_PORT,
      strictPort: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  }
})
