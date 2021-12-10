import * as ebl from "./index"
ebl.registerCommand({
	id:0,
	name:"HLW",
	action:()=>console.log("hello world"),
})
ebl.execute("\0")