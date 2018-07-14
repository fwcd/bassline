import * as WaveSurfer from "wavesurfer.js";
import { ViewNode } from "../ViewNode";
import { Observable } from "../../utils/Observable";
import { DeckModel } from "../../model/deck/DeckModel";
import { Debouncer } from "../../utils/Debouncer";

let debouncer = new Debouncer();

export class Waveform implements ViewNode {
	private element: HTMLElement;
	private wavesurfer: WaveSurfer;
	
	constructor(model: DeckModel, element: HTMLElement) {
		this.element = element;
		
		// Create wavesurfer instance and notify the model when it changes
		
		this.wavesurfer = WaveSurfer.create({
			container: this.element,
			waveColor: "white",
			height: element.clientHeight
		});
		this.wavesurfer.on("play", () => {
			model.playing.set(true);
		});
		this.wavesurfer.on("pause", () => {
			model.playing.set(false);
		});
		
		// Add global event listeners
		
		let uncheckedWavesurfer: any = this.wavesurfer;
		window.addEventListener("resize", () => {
			debouncer.executeMaybe(() => {
				let drawer: any = uncheckedWavesurfer.drawer;
				drawer.containerHeight = drawer.container.clientHeight
				drawer.containerWidth = drawer.container.clientWidth;
				uncheckedWavesurfer.drawBuffer();
			});
		});
		
		// Listen to model updates
		
		model.shouldPlay.listen(play => {
			if (play) {
				this.wavesurfer.play(undefined, undefined);
			} else {
				this.wavesurfer.pause();
			}
		});
		model.loadedAudioFile.listen(file => {
			this.load(file);
		});
	}
	
	public load(filePath: string): void {
		let url = "file://" + filePath;
		this.wavesurfer.load(url);
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
