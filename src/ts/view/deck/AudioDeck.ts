import { ViewNode } from "../ViewNode";

export class AudioDeck implements ViewNode {
	private element: HTMLAudioElement = document.createElement("audio");
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
