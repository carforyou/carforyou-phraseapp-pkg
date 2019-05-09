export default (availableCommands) => {
  console.log(`Available commands: ${availableCommands.join(", ")}`)
  process.exit(1)
}
