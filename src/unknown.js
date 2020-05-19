export default (availableCommands) => {
  console.info(`Available commands: ${availableCommands.join(", ")}`)
  process.exit(1)
}
