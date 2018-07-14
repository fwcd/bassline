import { AudioDeck } from "./AudioDeck";
import { DeckInputChooser } from "./DeckInputChooser";
import { ViewNode } from "../ViewNode";
import { Button } from "../controls/Button";
import { SwapButton } from "../controls/SwapButton";
import { Image } from "../controls/Image";

export class DeckView implements ViewNode {
	private audio = new AudioDeck();
	private inputChooser = new DeckInputChooser(this.audio);
	private playPause = new SwapButton("play");
	
	public constructor() {
		this.playPause.setStates({
			play: {
				node: Image.ofAsset("icons/play.svg", "deck-icon"),
				action: () => {
					this.audio.play();
					this.playPause.swap("pause");
				}
			},
			pause: {
				node: Image.ofAsset("icons/pause.svg", "deck-icon"),
				action: () => {
					this.audio.pause();
					this.playPause.swap("play");
				}
			}
		});
	}
	
	public placeIn(parent: HTMLElement): void {
		this.audio.placeIn(parent);
		this.inputChooser.placeIn(parent);
		parent.appendChild(document.createElement("br"));
		this.playPause.placeIn(parent);
	}
}
