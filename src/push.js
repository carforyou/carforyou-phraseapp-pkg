import url from "url"
import path from "path"
import childProcess from "child_process"

const log = console.log

export default () => {
  if (!process.env.CIRCLE_BRANCH !== "master") {
    throw new Error("Should only run on the master branch on CI")
  }

  const bin = process.env.CI ? path.resolve(url.parse(import.meta.url).path, "../../bin/phraseapp") : "phraseapp"

  const pushOutput = childProcess.execSync(
    `${bin} push --access-token $PHRASEAPP_TOKEN --wait`
  ).toString()
  log(pushOutput)

  const pattern = "Upload ID: (.*),"
  const lineRegex = new RegExp(pattern, "g")
  const matchingLines = pushOutput.match(lineRegex)

  matchingLines.forEach(line => {
    const idRegex = new RegExp(pattern)
    const idMatch = idRegex.exec(line)
    const uploadId = idMatch[1]

    log("Cleaning upload id: ", uploadId)

    const cleanOutput = execSync(
      `${bin} upload cleanup --access-token $PHRASEAPP_TOKEN --confirm -v ${uploadId}`
    ).toString()

    log(cleanOutput)
  })
}
