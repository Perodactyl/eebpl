"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.registerCommand = void 0;
const promises_1 = require("fs/promises");
var commandList = [];
async function registerCommand(command) {
    commandList = JSON.parse((await (0, promises_1.readFile)("commands.json")).toString());
    commandList.push(command);
    await (0, promises_1.writeFile)("commands.json", JSON.stringify(commandList, null, "\t"));
}
exports.registerCommand = registerCommand;
function execute(data, cursor) {
    var id = data[0];
    var command = commandList.find(el => el.id == id);
    command.action(data.slice(1));
    if (cursor) {
        cursor.position += command.length || 1;
    }
}
exports.execute = execute;
