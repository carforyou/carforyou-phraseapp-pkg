/* tslint:disable:no-console */
import fs from "fs"
import { sortObj } from "jsonabc"
import { diff } from "just-diff"

import getLocalesPaths from "./getLocalesPaths"

const modifiedFiles = []
const paths =  getLocalesPaths()

export default (args) => {
  const fix = args.includes("--fix")

  paths.forEach(path => {
    const previousContent = JSON.parse(fs.readFileSync(path, "utf8"))
    const newContent = sortObj(previousContent)

    const d = diff(previousContent, newContent)
    if (d.length > 0) {
      modifiedFiles.push(path)

      if(fix){
        console.log({fix})
        fs.writeFileSync(path, newContent)
      }
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
