import fs from "fs"
import path from "path"
import glob from "glob"
import { diff } from "just-diff"

export default () => {
  // todo: test both in project because of the path here...
  const allPaths = glob.sync("static/locales/*/*.json")
  const namespaces = Array.from(
    new Set(allPaths.map(p => path.basename(p, ".json")))
  )

  const deepKeys = obj => {
    return Object.keys(obj)
      .filter(key => obj[key] instanceof Object)
      .map(key => deepKeys(obj[key]).map(k => `${key}.${k}`))
      .reduce((x, y) => x.concat(y), Object.keys(obj))
  }

  namespaces.forEach(namespace => {
    const paths = glob.sync(`static/locales/*/${namespace}.json`)
    let previousKeys = []
    let previousLocale = null
    const errors = []

    paths.forEach(p => {
      const content = JSON.parse(fs.readFileSync(p, "utf8"))
      const keys = deepKeys(content)
      const locale = path
        .dirname(p)
        .split("/")
        .slice(-1)
        .pop()

      if (previousLocale) {
        const d = diff(previousKeys, keys)
        if (d.length > 0) {
          errors.push({
            diff: d,
            message: `${locale}/${namespace}.json: Differences compared to ${previousLocale}/${namespace}.json`
          })
        }
      }
      previousKeys = deepKeys(content)
      previousLocale = locale
    })

    if (errors.length) {
      errors.forEach(error => {
        console.error(error.message, "\n", error.diff)
      })
      process.exit(1)
    } else {
      process.exit(0)
    }
  })
}
