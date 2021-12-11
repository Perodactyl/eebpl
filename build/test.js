"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ebl = require("./index");
(async () => {
    ebl.registerCommand({
        id: 0,
        name: "PRT",
        length: 2,
        action: (args) => {
            process.stdout.write(args[0]);
        }
    });
    ebl.executeSequence("\0h\0e\0l\0l\0o\0 \0w\0o\0r\0l\0d");
})().catch((e) => {
    console.error(e);
});
