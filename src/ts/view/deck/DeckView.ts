import { AudioDeck } from "./AudioDeck";
import { DeckInputChooser } from "./DeckInputChooser";
import { ViewNode } from "../ViewNode";

export class DeckView implements ViewNode {
	private audio = new AudioDeck();
	private inputChooser = new DeckInputChooser(this.audio);
	
	public placeIn(parent: HTMLElement): void {
		this.audio.placeIn(parent);
		this.inputChooser.placeIn(parent);
	}
}
