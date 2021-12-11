"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeSequence = exports.getCommand = exports.execute = exports.registerCommand = void 0;
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
    var len = command.length;
    command.action(data.slice(1), cursor, id);
    if (cursor && len > 0) {
        cursor.position += len || 1;
    }
}
exports.execute = execute;
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
    }
}
exports.executeSequence = executeSequence;
