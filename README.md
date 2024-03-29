# Dectalk
A Simple package for using Dectalk (_Moonbase alpha voice_)  

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
### Windows
Windows support was added recently, 
if you have any problems dont be afraid to make an issue

### Mac
Unfortunately, Dectalk does not support macOS.
If you would like to use this module on Mac, try running your project
inside a Linux [Docker](https://www.docker.com/) container.

### Linux
On Linux, you may have to install a dependency:
```sh-session
apt install libpulse0
```
or
```sh-session
pacman -S libpulse
```
