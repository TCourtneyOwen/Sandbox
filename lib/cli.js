Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const commands = require("./commands");
commander
    .command("start")
    .option("-p --port [port number]", "Port number must be between 0 - 65535. If no port specified, port defaults to 8080")
    .action(commands.start);
commander.parse(process.argv);
//# sourceMappingURL=cli.js.map