"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.say = exports.Speaker = exports.WaveEncoding = void 0;
var node_child_process_1 = require("node:child_process");
var node_fs_1 = require("node:fs");
var node_os_1 = require("node:os");
var tmp_1 = require("tmp");
var WaveEncoding;
(function (WaveEncoding) {
    WaveEncoding[WaveEncoding["PCM_16bits_MONO_11KHz"] = 1] = "PCM_16bits_MONO_11KHz";
    WaveEncoding[WaveEncoding["PCM_8bits_MONO_11KHz"] = 2] = "PCM_8bits_MONO_11KHz";
    WaveEncoding[WaveEncoding["MULAW_8bits_MONO_8KHz"] = 3] = "MULAW_8bits_MONO_8KHz";
})(WaveEncoding = exports.WaveEncoding || (exports.WaveEncoding = {}));
/**
 * (_Linux only_)
 * Different settings for voices.
 */
var Speaker;
(function (Speaker) {
    /** Default male voice */
    Speaker[Speaker["PAUL"] = 0] = "PAUL";
    /** Default female voice */
    Speaker[Speaker["BETTY"] = 1] = "BETTY";
    /** Low-pitched male voice */
    Speaker[Speaker["HARRY"] = 2] = "HARRY";
    /** High-pitched hoarse male voice */
    Speaker[Speaker["FRANK"] = 3] = "FRANK";
    /** Nasally male voice */
    Speaker[Speaker["DENNIS"] = 4] = "DENNIS";
    /** High-pitched child voice */
    Speaker[Speaker["KID"] = 5] = "KID";
    /** High-pitched female voice */
    Speaker[Speaker["URSULA"] = 6] = "URSULA";
    /** Nasally female voice */
    Speaker[Speaker["RITA"] = 7] = "RITA";
    /** Low-pitched hoarse female voice */
    Speaker[Speaker["WENDY"] = 8] = "WENDY";
})(Speaker = exports.Speaker || (exports.Speaker = {}));
function say(content, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res, rej) {
                    var file = (0, tmp_1.fileSync)({ prefix: 'dectalk', postfix: '.wav' });
                    var dec;
                    // Windows
                    if ((0, node_os_1.platform)() === "win32") {
                        var args = [];
                        if (options) {
                            if (options.EnableCommands)
                                content = "[:PHONE ON]" + content;
                        }
                        else {
                            //Defaults
                            // EnableCommands
                            content = "[:PHONE ON]" + content;
                        }
                        args.push('-w', file.name);
                        //args.push('-d', __dirname + "\\..\\dtalk\\dtalk_us.dic");
                        args.push(content);
                        dec = (0, node_child_process_1.spawn)(__dirname + '\\..\\dtalk\\windows\\say.exe', args, { cwd: __dirname + '\\..\\dtalk\\windows' });
                    }
                    // Mac is NOT supported
                    else if ((0, node_os_1.platform)() === "darwin") {
                        rej('Dectalk is not supported on Mac');
                        return;
                    }
                    // Linux
                    else {
                        var args = [];
                        if (options) {
                            if (options.WaveEncoding)
                                args.push('-e', options.WaveEncoding.toString());
                            if (options.SpeakRate)
                                args.push('-r', options.SpeakRate.toString());
                            if (options.Speaker)
                                args.push('-s', options.Speaker.toString());
                            if (options.EnableCommands)
                                content = "[:PHONE ON]" + content;
                        }
                        else {
                            //Defaults
                            // EnableCommands
                            content = "[:PHONE ON]" + content;
                        }
                        args.push('-a', content);
                        args.push('-fo', file.name);
                        dec = (0, node_child_process_1.spawn)(__dirname + '/../dtalk/linux/say_demo_us', args, { cwd: __dirname + '/../dtalk' });
                    }
                    var exited = false;
                    // Reject if dectalk failed to start
                    dec.on('error', function (error) {
                        if (exited) {
                            return;
                        }
                        rej("Failed to start dectalk\n" + error);
                        exited = true;
                    });
                    // Redirect dectalk output to the console
                    dec.stdout.on('data', console.log);
                    dec.stderr.on('data', console.error);
                    dec.on('close', function (code) {
                        if (exited) {
                            return;
                        }
                        // Reject if dectalk was not successful
                        if (code !== 0) {
                            rej("Dectalk exited with code " + code);
                            return;
                        }
                        res((0, node_fs_1.readFileSync)(file.name));
                        exited = true;
                    });
                })];
        });
    });
}
exports.say = say;
