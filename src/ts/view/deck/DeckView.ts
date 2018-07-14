import { AudioDeck } from "./AudioDeck";
import { DeckInputChooser } from "./DeckInputChooser";
import { ViewNode } from "../ViewNode";
import { Button } from "../controls/Button";
import { ListenerList } from "../../utils/ListenerList";
import { SwapButton } from "../controls/SwapButton";

export class DeckView implements ViewNode {
	private audio = new AudioDeck();
	private inputChooser = new DeckInputChooser(this.audio);
	private playPause = new SwapButton("play");
	changeListeners = new ListenerList<void>();
	
	public constructor() {
		this.playPause.setStates({
			play: this.newButton("icons/play.svg", () => {
				this.audio.play();
				this.playPause.swap("pause");
			}),
			pause: this.newButton("icons/pause.svg", () => {
				this.audio.pause()
				this.playPause.swap("play");
			})
		});
	}
	
	private newButton(iconAsset: string, action: () => void): Button {
		let button = Button.withIcon(iconAsset, "deck-icon");
		button.setClass("deck-button");
		button.setAction(action);
		return button;
	}
	
	public placeIn(parent: HTMLElement): void {
		this.audio.placeIn(parent);
		this.inputChooser.placeIn(parent);
		parent.appendChild(document.createElement("br"));
		this.playPause.placeIn(parent);
	}
}
