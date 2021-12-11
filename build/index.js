"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeSequence = exports.getCommand = exports.executeFile = exports.execute = exports.registerCommand = void 0;
const promises_1 = require("fs/promises");
var commandList = [];
function registerCommand(...commands) {
    commands.forEach(command => {
        command.id = commandList.length;
        commandList.push(command);
    });
}
exports.registerCommand = registerCommand;
async function execute(data, cursor) {
    var id = data[0].codePointAt(0);
    var command = getCommand(id);
    if (!command) {
        cursor.position = -1;
        throw "\nAttempt to execute unknown command ID: " + id + (cursor ? " @byte: " + cursor.position : "");
    }
    var len = command.length;
    command.action(data.slice(1), cursor, id);
    if (cursor && len > 0) {
        cursor.position += len || 1;
    }
}
exports.execute = execute;
async function executeFile(path) {
    var buf = await (0, promises_1.readFile)(path);
    var file = buf.toString();
    await executeSequence(file);
}
exports.executeFile = executeFile;
function getCommand(id) {
    return commandList.find(el => el.id == (typeof id == "number" ? id : id.codePointAt(0)));
}
exports.getCommand = getCommand;
async function executeSequence(data) {
    var cursor = {
        position: 0
    };
    while (cursor.position < data.length) {
        let cmd = getCommand(data[cursor.position]);
        let end = 0;
        let line;
        if (cmd) {
            end = (cursor.position || 0) + (cmd.length || 1);
            line = data.slice(cursor.position, end);
        }
        else {
            line = data.slice(cursor.position);
        }
        await execute(line, cursor);
        if (cursor.position == -1) {
            return;
        }
    }
}
exports.executeSequence = executeSequence;
