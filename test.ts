import * as ebl from "./index"
(async ()=>{
	ebl.registerCommand({
		id:0,
		name:"PRT",
		length:2,
		action:(args)=>{
			process.stdout.write(args[0])
		}
	})
	ebl.registerCommand({
		id:1,
		name:"HLW",
		length:6,
		action:args=>{
			console.log("hello", args)
		}
	})
	await ebl.executeSequence("\0h\0e\0l\0l\0o\0 \0w\0o\0r\0l\0d")
	console.log("\nfile:\n")
	await ebl.executeFile("test.ebpl")
})().catch((e)=>{
	console.error(e)
})