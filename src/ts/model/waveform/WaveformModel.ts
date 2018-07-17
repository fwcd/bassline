import * as fs from "fs";
import { Observable } from "../../utils/Observable";
import { posAndNegAverage, notNaNOr } from "../../utils/MathUtils";

/*
 * Source: https://gist.github.com/bodyflex/e4f6c9ec0fdea9450fd9303dd088b96d
 * Author: https://github.com/bodyflex
 */

function toArrayBuffer(b: Buffer): ArrayBuffer {
	return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
}

export class WaveformModel {
	/**
	 * Formatted like this:
	 * [+, -, +, -, ...]
	 */
	waveformData = new Observable<Float32Array>();
	
	public constructor(audioFile: string, dataPoints: number, context: AudioContext) {
		fs.readFile(audioFile, (error, buffer) => {
			context.decodeAudioData(toArrayBuffer(buffer))
				.then(audioBuffer => {
					this.waveformData.set(this.createWaveformData(audioBuffer, dataPoints))
				})
				.catch(console.error);
		});
	}
	
	private createWaveformData(audioBuffer: AudioBuffer, dataPoints: number): Float32Array {
		let leftChannel = audioBuffer.getChannelData(0);
		let rightChannel = audioBuffer.getChannelData(1);
		let values = new Float32Array(dataPoints);
		
		let dataWindow = Math.round(leftChannel.length / dataPoints) * 4;
		let valueIndex = 0;
		let buffer: number[] = [];
		
		for (let i=0; i<leftChannel.length; i++) {
			buffer.push(leftChannel[i]);
			buffer.push(rightChannel[i]);
			
			if (buffer.length >= dataWindow) {
				let avg = posAndNegAverage(buffer);
				values[valueIndex++] = notNaNOr(avg.positive, 0);
				values[valueIndex++] = notNaNOr(avg.negative, 0);
				buffer = [];
			}
		}
		
		return values;
	}
}
