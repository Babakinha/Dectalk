import * as child from 'child_process';
import * as fs from 'fs'
import * as tmp from 'tmp'

export enum WaveEncoding {
    PCM_16bits_MONO_11KHz = 1,
    PCM_8bits_MONO_11KHz = 2,
    MULAW_8bits_MONO_8KHz = 3
}

type decOptions = {
    WaveEncoding?: WaveEncoding,
    SpeakRate?: number
    SpeakNumber?: 1|2|3|4|5|6|7|8|9

}

export async function say(content:string, options?: decOptions): Promise<Buffer> {
    return new Promise((res, rej) => {
        const file = tmp.fileSync({prefix: 'dectalk-', postfix: '.wav'});

        var args: string[] = [];
        
        if(options) {
            if(options.WaveEncoding)
                args.push('-e', options.WaveEncoding.toString());
            if(options.SpeakRate)
                    args.push('-r', options.WaveEncoding.toString());
            if(options.SpeakNumber)
                args.push('-s', options.SpeakNumber.toString());
        }
        args.push('-a', content);
        args.push('-fo', file.name);
        
        
        const dec = child.spawn(__dirname + '/../dtalk/say_demo_us', args, {cwd: __dirname + '/../dtalk'});

        dec.on('close', () => {
            res(fs.readFileSync(file.name));
        })
    }) 
}