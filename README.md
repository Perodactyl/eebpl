# Easily Extensible Binary Programming Language

Easily extensible binary programming language is written in typescript, with a very simple concept.  The syntax is a command byte, followed by however many argument bytes that command wants.

Now, there's a reason why it's called "easily extensible." Observe:

```ts
//This code hasn't actually been tested
import * as ebl from "eebpl"
ebl.registerCommand({
	id:0,
	name:"HLW", //Hello World
	length:6 //One byte of Command, 5 characters afterwords
	action:function(args){
		console.log("hello "+args.join(""))
	}
})
ebl.execute("\0world") //Now run it. Null is id 0, then the arguments
ebl.execute("\0test ") //This space is to fill up argument 5
```
This just adds a command and immediately runs it. You can also execute multiple commands in a row.
```ts
ebl.executeSequence("\0world\0test \0thing")
```