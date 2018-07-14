import { DeckInputChooser } from "./DeckInputChooser";
import { ViewNode } from "../ViewNode";
import { SwapButton } from "../controls/SwapButton";
import { Image } from "../controls/Image";
import { WaveformAudioDeck } from "./WaveformAudioDeck";

export class DeckView implements ViewNode {
	private audio: WaveformAudioDeck = new WaveformAudioDeck();
	private inputChooser = new DeckInputChooser(this.audio);
	private playPause = new SwapButton("play");
	
	public constructor() {
		this.playPause.setStates({
			play: {
				node: Image.ofAsset("icons/play.svg", "deck-icon"),
				action: () => { this.audio.play(); }
			},
			pause: {
				node: Image.ofAsset("icons/pause.svg", "deck-icon"),
				action: () => { this.audio.pause(); }
			}
		});
		this.audio.isPlaying.listen(playing => {
			this.playPause.swap(playing ? "pause" : "play");
		});
	}
	
	public placeIn(parent: HTMLElement): void {
		this.audio.placeIn(parent);
		this.inputChooser.placeIn(parent);
		parent.appendChild(document.createElement("br"));
		this.playPause.placeIn(parent);
	}
}
