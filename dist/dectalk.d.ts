/// <reference types="node" />
export declare enum WaveEncoding {
    PCM_16bits_MONO_11KHz = 1,
    PCM_8bits_MONO_11KHz = 2,
    MULAW_8bits_MONO_8KHz = 3
}
declare type decOptions = {
    WaveEncoding?: WaveEncoding;
    SpeakRate?: number;
    SpeakNumber?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
};
export declare function say(content: string, options?: decOptions): Promise<Buffer>;
export {};
