import { ViewNode } from "../ViewNode";

export class AudioDeck implements ViewNode {
	private element: HTMLAudioElement = document.createElement("audio");
	
	constructor() {
		this.element.setAttribute("controls", "");
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
	
	public isPlaying(): boolean {
		return !this.element.paused;
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
