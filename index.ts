import { readFile, writeFile } from "fs/promises"
export interface command{
	id:number
	name:string
	length?:number,
	action:Function,
	temp?:boolean
}
export interface cursor{
	position:number
	command?:command
}
var commandList:command[] = []
export function registerCommand(...commands:command[]){
	commands.forEach(command=>{
		command.id = commandList.length
		commandList.push(command)
	})
}
export async function execute(data:ArrayBufferLike|String,cursor?:cursor){
	var id = data[0].codePointAt(0)
	var command = getCommand(id)
	var len = command.length
	command.action(data.slice(1),cursor,id)
	if(cursor && len > 0){
		cursor.position += len || 1
	}
}
export function getCommand(id:number|string) : command|undefined{
	return commandList.find(el=>el.id == (typeof id == "number" ? id : id.codePointAt(0)))
}
export async function executeSequence(data:String){
	var cursor:cursor = {
		position:0
	}
	while(cursor.position < data.length){
		let cmd = getCommand(data[cursor.position])
		let end = 0
		let line:String
		if(cmd){
			end = (cursor.position || 0)+(cmd.length || 1)
			line = data.slice(cursor.position,end)
		}else{
			line = data.slice(cursor.position)
		}
		await execute(line,cursor)
	}
}