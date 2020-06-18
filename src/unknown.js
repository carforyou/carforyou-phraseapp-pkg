export default (availableCommands) => {
  // eslint-disable-next-line no-console
  console.info(`Available commands: ${availableCommands.join(", ")}`)
  process.exit(1)
}
