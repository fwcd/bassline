import { ViewNode } from "../ViewNode";
import { BasicAudioDeck } from "./BasicAudioDeck";
import { WaveformAudioDeck } from "./WaveformAudioDeck";

export class DeckInputChooser implements ViewNode {
	private element: HTMLInputElement = document.createElement("input");
	
	public constructor(audio: BasicAudioDeck | WaveformAudioDeck) {
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
