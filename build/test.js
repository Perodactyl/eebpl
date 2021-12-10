"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ebl = require("./index");
ebl.registerCommand({
    id: 0,
    name: "HLW",
    action: () => console.log("hello world"),
});
ebl.execute("\0");
