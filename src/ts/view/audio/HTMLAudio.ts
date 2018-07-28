import { DeckModel } from "../../model/deck/DeckModel";
import { ViewNode } from "../ViewNode";
import { AudioBackend } from "./AudioBackend";

export class HTMLAudio implements AudioBackend, ViewNode {
	private element: HTMLAudioElement = document.createElement("audio");
	private updateRate = 100; // ms
	private model?: DeckModel;
	private intervalHandle?: number;
	
	constructor() {
		this.element.controls = false;
	}
	
	public bind(model: DeckModel): void {
		this.model = model;
		
		// Send actual values back to the model
		
		this.element.addEventListener("pause", () => {
			model.playing.update(false);
			if (this.intervalHandle) {
				window.clearInterval(this.intervalHandle);
			}
		});
		this.element.addEventListener("play", () => {
			model.playing.update(true);
			this.intervalHandle = window.setInterval(() => {
				this.updatePosition();
			}, this.updateRate);
		});
		this.element.addEventListener("loadeddata", () => {
			model.durationInSec.set(this.element.duration);
			model.positionInSec.update(this.element.currentTime);
		});
		this.element.addEventListener("timeupdate", () => {
			
		});
		
		// Receive intended values
		
		model.playing.pollListen(shouldPlay => {
			if (shouldPlay) {
				this.element.play();
			} else {
				this.element.pause();
			}
		});
		model.fader.listen(faderVolume => {
			this.element.volume = faderVolume;
		});
		model.loadedAudioFile.listen(filePath => {
			let url = "file://" + filePath;
			this.element.src = url;
			model.playing.update(false);
		});
		model.positionInSec.pollListen(pos => {
			this.element.currentTime = pos;
			this.updatePosition();
		});
	}
	
	private updatePosition(): void {
		this.model.positionInSec.update(this.element.currentTime);
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
