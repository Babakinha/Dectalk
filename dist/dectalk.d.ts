/// <reference types="node" />
export declare enum WaveEncoding {
    PCM_16bits_MONO_11KHz = 1,
    PCM_8bits_MONO_11KHz = 2,
    MULAW_8bits_MONO_8KHz = 3
}
declare type DecOptions = {
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
    WaveEncoding?: WaveEncoding;
    /**
     * (_Linux only_)
     * The speed that he talks
     */
    SpeakRate?: number;
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
    SpeakerNumber?: number;
    /**
     * Enable phoname commands
     *
     * example: "[bah<235,3>]"
     *
     * ### NOTE:
     * - phonames can be enabled just by putting "[:PHONE ON]" at the start of the content
     */
    EnableCommands?: boolean;
};
export declare function say(content: string, options?: DecOptions): Promise<Buffer>;
export {};
