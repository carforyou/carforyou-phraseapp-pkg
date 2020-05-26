import fs from "fs"

import getLocalesPaths from "./getLocalesPaths"

const modifiedFiles = []
const paths = getLocalesPaths()

export default (args) => {
  const fix = args.includes("--fix")

  paths.forEach((path) => {
    const previousContent = fs.readFileSync(path, "utf8")
    const newContent = JSON.stringify(JSON.parse(previousContent), null, "  ")

    if (previousContent !== newContent) {
      modifiedFiles.push(path)

      if (fix) {
        fs.writeFileSync(path, newContent)
      }
    }
  })

  if (fix) {
    process.exit(0)
  }

  if (modifiedFiles.length > 0) {
    console.error(
      "The following files were not sorted:",
      "\n",
      modifiedFiles.join(", ")
    )
    process.exit(1)
  } else {
    process.exit(0)
  }
}
