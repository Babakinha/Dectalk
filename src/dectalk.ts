import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { platform } from 'node:os';
import { fileSync as makeTempFile } from 'tmp';

export enum WaveEncoding {
	PCM_16bits_MONO_11KHz = 1,
	PCM_8bits_MONO_11KHz = 2,
	MULAW_8bits_MONO_8KHz = 3
}

/**
 * (_Linux only_)
 * Different settings for voices.
 */
export enum Speaker {
	/** Default male voice */
	PAUL = 0,
	/** Default female voice */
	BETTY = 1,
	/** Low-pitched male voice */
	HARRY = 2,
	/** High-pitched hoarse male voice */
	FRANK = 3,
	/** Nasally male voice */
	DENNIS = 4,
	/** High-pitched child voice */
	KID = 5,
	/** High-pitched female voice */
	URSULA = 6,
	/** Nasally female voice */
	RITA = 7,
	/** Low-pitched hoarse female voice */
	WENDY = 8
}

export type DecOptions = {
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
	 * The speed that he talks in words-per-minute
	 * Limit is 75 to 600
	 */
	SpeakRate?: number,

	/**
	 * (_Linux only_)
	 * The voice of who talks. Default is PAUL (0)
	 */
	Speaker?: Speaker,

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
		// Windows
		if (platform() === "win32") {
			var args: string[] = [];
			if (options) {
				if(options.EnableCommands)
						content = "[:PHONE ON]" + content;
			} else {
				//Defaults
				// EnableCommands
				content = "[:PHONE ON]" + content;
			}
			args.push('-w', file.name);
			//args.push('-d', __dirname + "\\..\\dtalk\\dtalk_us.dic");
			args.push(content);


			dec = spawn(__dirname + '\\..\\dtalk\\windows\\say.exe', args, {cwd: __dirname + '\\..\\dtalk\\windows'});
		}
		// Mac is NOT supported
		else if (platform() === "darwin") {
			rej('Dectalk is not supported on Mac');
		}
		// Linux
		else {
			var args: string[] = [];
			if (options) {
				if(options.WaveEncoding)
						args.push('-e', options.WaveEncoding.toString());
				if(options.SpeakRate)
						args.push('-r', options.SpeakRate.toString());
				if(options.Speaker)
						args.push('-s', options.Speaker.toString());
				if(options.EnableCommands)
						content = "[:PHONE ON]" + content;
			} else {
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
			if (code !== 0){
				rej(`Dectalk exited with code ${code}`);

				return;
			}

			res(readFileSync(file.name));
		})
	}) 
}
