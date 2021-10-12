# Dectalk
A Simple package for using Dectalk
# Installation
```sh-session
npm install dectalk
```
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
    writeFileSync('Hello.wav', WavData)
})();

```
