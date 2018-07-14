import { ViewNode } from "../ViewNode";
import { AudioDeck } from "./AudioDeck";

export class DeckInputChooser implements ViewNode {
	private element: HTMLInputElement = document.createElement("input");
	
	public constructor(audio: AudioDeck) {
		this.element.setAttribute("type", "file");
		this.element.addEventListener("change", () => {
			let files = this.element.files;
			if (files.length > 0) {
				audio.load(files.item(0));
			}
		});
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
