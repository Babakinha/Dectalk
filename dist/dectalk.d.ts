/// <reference types="node" />
export declare enum WaveEncoding {
    PCM_16bits_MONO_11KHz = 1,
    PCM_8bits_MONO_11KHz = 2,
    MULAW_8bits_MONO_8KHz = 3
}
/**
 * (_Linux only_)
 * Different settings for voices.
 */
export declare enum Speaker {
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
export declare type DecOptions = {
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
     * The voice of who talks. Default is PAUL (0)
     */
    Speaker?: Speaker;
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
