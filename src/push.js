import url from "url"
import path from "path"
import { execSync } from "child_process"

export default () => {
  if (process.env.CIRCLE_BRANCH !== "master") {
    console.error("Should only run on the master branch on CI")
    process.exit(1)
  }

  const bin = process.env.CI
    ? path.resolve(url.parse(import.meta.url).path, "../../bin/phraseapp")
    : "phraseapp"

  const pushOutput = execSync(
    `${bin} push --access-token $PHRASEAPP_TOKEN --wait`
  ).toString()
  console.info(pushOutput)

  const pattern = "Upload ID: (.*),"
  const lineRegex = new RegExp(pattern, "g")
  const matchingLines = pushOutput.match(lineRegex)

  matchingLines.forEach((line) => {
    const idRegex = new RegExp(pattern)
    const idMatch = idRegex.exec(line)
    const uploadId = idMatch[1]

    console.info("Cleaning upload id:", uploadId)

    const cleanOutput = execSync(
      `${bin} upload cleanup --access-token $PHRASEAPP_TOKEN --confirm -v ${uploadId}`
    ).toString()

    console.info(cleanOutput)
  })

  process.exit(0)
}
