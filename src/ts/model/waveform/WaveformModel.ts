import * as fs from "fs";
import { Observable } from "../../utils/Observable";
import { average } from "../../utils/MathUtils";

/*
 * Source: https://gist.github.com/bodyflex/e4f6c9ec0fdea9450fd9303dd088b96d
 * Author: https://github.com/bodyflex
 */

function toArrayBuffer(b: Buffer): ArrayBuffer {
	return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
}

export class WaveformModel {
	waveformData = new Observable<Float32Array>();
	
	public constructor(audioFile: string, dataPoints: number, context: AudioContext) {
		let source = context.createBufferSource();
		let buffer = fs.readFile(audioFile, (error, buffer) => {
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
		
		let dataWindow = Math.round(leftChannel.length / dataPoints);
		let valueIndex = 0;
		let buffer: number[] = [];
		
		for (let i=0; i<leftChannel.length; i++) {
			let avg = (leftChannel[i] + rightChannel[i]) / 2;
			buffer.push(avg);
			
			if (buffer.length >= dataWindow) {
				values[valueIndex++] = average(buffer);
				buffer = [];
			}
		}
		
		return values;
	}
}
