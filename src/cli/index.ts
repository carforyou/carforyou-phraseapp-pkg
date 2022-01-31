import validate from "./validate"
import unknown from "./unknown"
import sort from "./sort"
import push from "./push"

export default function run(args) {
  const selectedCommand = args[2]
  const commands = { push, sort, validate }

  const command = commands[selectedCommand]
  command ? command(args) : unknown(Object.keys(commands))
}
