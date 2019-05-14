/* tslint:disable:no-console */
import fs from "fs"
import glob from "glob"
import sortJson from "sort-json"

const modifiedFiles = []
const paths = glob.sync("static/locales/*/*.json")

export default (args) => {
  const fix = args.includes("--fix")

  paths.forEach(path => {
    const previousContent = fs.readFileSync(path, "utf8")
    sortJson.overwrite(path)
    const newContent = fs.readFileSync(path, "utf8")

    if (previousContent !== newContent) {
      modifiedFiles.push(path)
    }
  })

  if (fix) {
    process.exit(0)
  }

  if (modifiedFiles.length > 0) {
    console.error("The following files were not sorted:", "\n", modifiedFiles.join(", "))
    process.exit(1)
  } else {
    process.exit(0)
  }
}
