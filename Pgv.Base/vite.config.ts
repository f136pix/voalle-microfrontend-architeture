import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import federation from "@originjs/vite-plugin-federation"
import packageData from "./package.json" assert { type: "json" }
import EnvironmentPlugin from "vite-plugin-environment"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  const appName = packageData.name

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      federation({
        name: appName,
        filename: "remoteEntry.js",
        exposes: {
          "./Template": "./src/containers/Template/view/TemplateView.tsx",
          "./Login": "./src/containers/Login/view/LoginView.tsx",
          "./Workspace": "./src/App.tsx",
          "./AuthStore": "./src/services/auth/auth.ts",
          "./UseTemplateController": "./src/hooks/useTemplateController.ts",
          "./Requests": "./src/services/requests/requests.ts",
          "./TabActionPabx":
            "./src/containers/Template/components/TabActionPabx/TabActionPabx.tsx",
          "./TabActionsRoutineOptions":
            "./src/containers/Template/components/TabActionRoutineOptions/TabActionsRoutineOptions.tsx",
          "./TabsActionsCards":
            "./src/containers/Template/components/TabsActionsCards/index.ts",
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
    optimizeDeps: {
      include: ["@emotion/styled"],
    },
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
