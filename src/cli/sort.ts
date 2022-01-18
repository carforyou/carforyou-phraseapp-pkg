import { execSync } from "child_process"

import getLocalesPaths from "./getLocalesPaths"

const paths = getLocalesPaths()

export default (args) => {
  const fix = args.includes("--fix")

  try {
    execSync(
      `npx sort-phraseapp-locales ${paths.join(" ")} ${fix ? "--fix" : ""}`
    )
  } catch (e) {
    process.exit(1)
  }
  process.exit(0)
}
