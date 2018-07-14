import { ViewNode } from "../ViewNode";
import { Observable } from "../../utils/Observable";

export class AudioDeck implements ViewNode {
	private element: HTMLAudioElement = document.createElement("audio");
	isPlaying = new Observable(false);
	
	constructor() {
		this.element.setAttribute("controls", "");
		this.element.addEventListener("pause", () => {
			this.isPlaying.set(false);
		});
		this.element.addEventListener("play", () => {
			this.isPlaying.set(true);
		});
	}
	
	public load(file: File): void {
		let url = "file://" + file.path;
		this.element.src = url;
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
