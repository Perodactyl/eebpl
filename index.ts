import { readFile, writeFile } from "fs/promises"
export interface command{
	id:number
	name:string
	length?:number
	action:Function
}
export interface cursor{
	position:number
	command?:command
}
var commandList:command[] = []
export async function registerCommand(command:command){
	commandList = JSON.parse((await readFile("commands.json")).toString())
	commandList.push(command)
	await writeFile("commands.json",JSON.stringify(commandList,null,"\t"))
}
export function execute(data:ArrayBufferLike|String,cursor?:cursor){
	var id = data[0]
	var command = commandList.find(el=>el.id == id)
	command.action(data.slice(1))
	if(cursor){
		cursor.position += command.length || 1
	}
}