import push from "./push"
import sort from "./sort"
import validate from "./validate"
import unknown from "./unknown"

export default function run (args) {
  const selectedCommand = args[2]
  const commands = {push, sort, validate}

  const command = commands[selectedCommand]
  command ? command(args) : unknown(selectedCommand)
}
