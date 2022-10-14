import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { platform } from 'node:os';
import { fileSync as makeTempFile } from 'tmp';

export enum WaveEncoding {
	PCM_16bits_MONO_11KHz = 1,
	PCM_8bits_MONO_11KHz = 2,
	MULAW_8bits_MONO_8KHz = 3
}

type DecOptions = {
	/**
	 * (_Linux only_)
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
	 * (_Linux only_)
	 * The speed that he talks
	 */
	SpeakRate?: number,

	/**
	 * (_Linux only_)
	 * The voice of who talks. Default is 0
	 *
	 * 0. Paul (male)
	 * 1. Betty (female)
	 * 2. Harry (male, low pitch)
	 * 3. Frank (male, high pitch and hoarse)
	 * 4. Dennis (male, nasally)
	 * 5. Kid (child, high pitch)
	 * 6. Ursula (female, high pitch)
	 * 7. Rita (female, nasally)
	 * 8. Wendy (female, low pitch and hoarse)
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
		const file = makeTempFile({prefix: 'dectalk', postfix: '.wav'});
		
		let dec;
		//Windows
		if(platform() == "win32") {
				var args: string[] = [];
				if(options) {
					if(options.EnableCommands)
							content = "[:PHONE ON]" + content;
				}else {
					//Defaults
					// EnableCommands
					content = "[:PHONE ON]" + content;
				}
				args.push('-w', file.name);
				//args.push('-d', __dirname + "\\..\\dtalk\\dtalk_us.dic");
				args.push(content);


				dec = spawn(__dirname + '\\..\\dtalk\\windows\\say.exe', args, {cwd: __dirname + '\\..\\dtalk\\windows'});
		}
		//Linux / Others
		else {
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


				dec = spawn(__dirname + '/../dtalk/linux/say_demo_us', args, {cwd: __dirname + '/../dtalk'});
		}

		// Reject if dectalk failed to start
		dec.on('error', error => {
			rej(`Failed to start dectalk\n${error}`);
		});

		// Redirect dectalk output to the console
		dec.stdout.on('data', console.log);
		dec.stderr.on('data', console.error);

		dec.on('close', code => {
			// Reject if dectalk was not successful
			if (code !== 0) rej(`Dectalk exited with code ${code}`);

			res(readFileSync(file.name));
		})
	}) 
}
