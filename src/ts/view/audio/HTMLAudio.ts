import { ViewNode } from "../ViewNode";
import { Observable } from "../../utils/Observable";
import { AudioBackend } from "./AudioBackend";
import { DeckModel } from "../../model/deck/DeckModel";

export class HTMLAudio implements AudioBackend, ViewNode {
	private element: HTMLAudioElement = document.createElement("audio");
	
	constructor() {
		this.element.controls = false;
	}
	
	public bind(model: DeckModel): void {
		// Send actual values back to the model
		
		this.element.addEventListener("pause", () => {
			model.playing.update(false);
		});
		this.element.addEventListener("play", () => {
			model.playing.update(true);
		});
		this.element.addEventListener("loadeddata", () => {
			model.durationInSec.set(this.element.duration);
			model.positionInSec.update(this.element.currentTime);
		});
		this.element.addEventListener("timeupdate", () => {
			model.positionInSec.update(this.element.currentTime);
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
		});
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
