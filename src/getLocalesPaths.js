/* tslint:disable:no-console */
import fs from "fs"
import path from "path"
import yaml from "js-yaml"
import glob from "glob"

const configFilePath = ".phraseapp.yml"

const getLocaleGlobs = () => {
  try {
    const phraseapConfig = yaml.safeLoad(fs.readFileSync(path.join(process.cwd(), configFilePath), "utf8"))
    return phraseapConfig.phraseapp.pull.targets.map(target => {
      return target.file.replace("<locale_name>", "*")
    })
  } catch {
    console.error("Phraseapp config not found falling back to static/locales/*/*.json")

    return [ "static/locales/*/*.json" ]
  }
}

export default () => {
  const localesGlobs = getLocaleGlobs()

  return localesGlobs.reduce((acc, g) => {
    return acc.concat(glob.sync(g))
  }, [])
}
