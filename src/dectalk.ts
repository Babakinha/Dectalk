import { spawn } from 'child_process';
import { readFileSync } from 'fs'
import * as tmp from 'tmp'

export enum WaveEncoding {
    PCM_16bits_MONO_11KHz = 1,
    PCM_8bits_MONO_11KHz = 2,
    MULAW_8bits_MONO_8KHz = 3
}

type DecOptions = {
    /**
     * The encoding the wav file is
     *
     * PCM_16bits_MONO_11KHz = 1,
     *
     * PCM_8bits_MONO_11KHz = 2,
     * 
     * MULAW_8bits_MONO_8KHz = 3
     */
    WaveEncoding?: WaveEncoding,

    /**
     * The speed that he talks
     */
    SpeakRate?: number,

    /**
     * The voice of who talks
     *
     * Here is what i think they are
     *
     * -> 0. Default voice
     * 1. Female voice
     * 2. Low pitch guy
     * 3. Another Female voice?
     * 4. Almost Default voice (a little lower pitch)
     * 5. Female very high pitch
     * 6. Female high pitch (like the previouse but lower)
     * 7. Another male voice
     * 8. Another female voice
     *
     * Any other numbers defaults to the 0 voice
     */
    SpeakerNumber?: number,

    /**
     * Enable phoname commands
     *
     * example: "[bah<235,3>]"
     *
     * ### NOTE:
     * - phonames can be enabled just by putting "[:PHONE ON]" at the start of the content
     */
    EnableCommands?: boolean

}

export async function say(content:string, options?: DecOptions): Promise<Buffer> {
    return new Promise((res, rej) => {
        const file = tmp.fileSync({prefix: 'dectalk-', postfix: '.wav'});

        var args: string[] = [];
        if(options) {
            if(options.WaveEncoding)
                args.push('-e', options.WaveEncoding.toString());
            if(options.SpeakRate)
                    args.push('-r', options.SpeakRate.toString());
            if(options.SpeakerNumber)
                args.push('-s', options.SpeakerNumber.toString());
            if(options.EnableCommands)
                content = "[:PHONE ON]" + content;
        }else {
            //Defaults
            // EnableCommands
            content = "[:PHONE ON]" + content;
        }
        args.push('-a', content);
        args.push('-fo', file.name);
        
        
        const dec = spawn(__dirname + '/../dtalk/say_demo_us', args, {cwd: __dirname + '/../dtalk'});

        dec.on('close', () => {
            res(readFileSync(file.name));
        })
    }) 
}