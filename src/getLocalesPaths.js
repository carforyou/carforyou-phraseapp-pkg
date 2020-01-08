import fs from "fs"
import path from "path"
import yaml from "js-yaml"
import glob from "glob"

const configFilePath = ".phraseapp.yml"

const getLocaleGlobs = () => {
  try {
    const phraseappConfig = yaml.safeLoad(fs.readFileSync(path.join(process.cwd(), configFilePath), "utf8"))
    return phraseappConfig.phraseapp.pull.targets.map(target => {
      return target.file.replace("<locale_name>", "*")
    })
  } catch {
    throw new Error("Phraseapp config not found or malformed")
  }
}

export default () => {
  const localesGlobs = getLocaleGlobs()

  return localesGlobs.reduce((acc, g) => {
    return acc.concat(glob.sync(g))
  }, [])
}
