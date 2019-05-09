import push from "./push"
import unknown from "./unknown"

export default function run (args) {
  const selectedCommand = args[2]
  const commands = {push}

  const command = commands[selectedCommand]
  command ? command() : unknown(Object.keys(commands))
}
