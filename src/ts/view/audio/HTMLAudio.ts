import { ViewNode } from "../ViewNode";
import { Observable } from "../../utils/Observable";
import { AudioBackend } from "./AudioBackend";

export class HTMLAudio implements AudioBackend, ViewNode {
	private element: HTMLAudioElement = document.createElement("audio");
	isPlaying = new Observable(false);
	
	constructor() {
		this.element.controls = true;
		this.element.addEventListener("pause", () => {
			this.isPlaying.set(false);
		});
		this.element.addEventListener("play", () => {
			this.isPlaying.set(true);
		});
		this.element.controls = false;
	}
	
	public load(filePath: string): void {
		let url = "file://" + filePath;
		this.element.src = url;
	}
	
	public setFaderVolume(faderVolume: number): void {
		this.element.volume = faderVolume;
	}
	
	public play(): void {
		this.element.play();
	}
	
	public pause(): void {
		this.element.pause();
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
