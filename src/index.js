import push from "./push"
import sort from "./sort"
import unknown from "./unknown"

export default function run (args) {
  const selectedCommand = args[2]
  const commands = {push, sort}

  const command = commands[selectedCommand]
  command ? command(args) : unknown(selectedCommand)
}
