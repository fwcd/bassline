import * as WaveSurfer from "wavesurfer.js";
import { ViewNode } from "../ViewNode";
import { Observable } from "../../utils/Observable";

export class WaveformAudioDeck implements ViewNode {
	private element: HTMLElement;
	private wavesurfer: WaveSurfer;
	isPlaying = new Observable(false);
	
	constructor() {
		this.element = document.createElement("div");
		this.wavesurfer = WaveSurfer.create({
			container: this.element,
			waveColor: "white"
		});
		this.wavesurfer.on("play", () => {
			this.isPlaying.set(true);
		});
		this.wavesurfer.on("pause", () => {
			this.isPlaying.set(false);
		});
		
		this.element.setAttribute("controls", "");
		this.element.addEventListener("pause", () => {
			this.isPlaying.set(false);
		});
		this.element.addEventListener("play", () => {
			this.isPlaying.set(true);
		});
	}
	
	public load(filePath: string): void {
		let url = "file://" + filePath;
		this.wavesurfer.load(url);
	}
	
	public play(): void {
		this.wavesurfer.play(undefined, undefined);
	}
	
	public pause(): void {
		this.wavesurfer.pause();
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
