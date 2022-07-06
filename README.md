# Dectalk
A Simple package for using Dectalk (_Moonbase alpha voice_)

_only works on linux though_
# Installation
```sh-session
npm install dectalk
```

_see [notes](#notes) if it doesn't work for you_ 
# Example
Javascript:
```js
const { say } = require('dectalk');
const { writeFileSync } = require('fs');
(async () => {

    const WavData = await say("Hello World!");
    writeFileSync('Hello.wav', WavData)
    
})();
```
Typescript:
```ts
import { writeFileSync } from "fs";
import { say } from 'dectalk';

(async () => {

    const WavData: Buffer = await say("Hello World");
    writeFileSync('Hello.wav', WavData);
    
})();
```

## Notes
On my arch linux server (x86_64)
i had to install some dependencies
```sh-session
yay -S gcc-multilib lib32-glibc
```
since i was running 64-bit and the binary is 32-bit

but on ubuntu i didnt (it must have them pre installed)
