import { ViewNode } from "../ViewNode";
import { DeckModel } from "../../model/deck/DeckModel";

export class DeckInputChooser implements ViewNode {
	private element: HTMLInputElement = document.createElement("input");
	
	public constructor(deckModel: DeckModel) {
		this.element.setAttribute("type", "file");
		this.element.addEventListener("change", () => {
			let files = this.element.files;
			if (files.length > 0) {
				deckModel.loadedAudioFile.set(files.item(0));
			}
		});
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
