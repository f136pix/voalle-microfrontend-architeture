/* eslint-disable no-console */
/* eslint-disable no-undef */
import packageData from "./package.json" assert { type: "json" }

const version = packageData.engines.node

if (process.version !== version && process.version !== `v${version}`) {
  console.log(
    `Required node version v${version} not satisfied with current version ${process.version}.`
  )
  console.log("Use command:", `\x1b[32m nvm use ${version}\x1b[0m`)
  process.exit(1)
}
