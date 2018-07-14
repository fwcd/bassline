import { DeckInputChooser } from "./DeckInputChooser";
import { ViewNode } from "../ViewNode";
import { SwapButton } from "../controls/SwapButton";
import { Image } from "../controls/Image";
import { WaveformAudioDeck } from "./WaveformAudioDeck";
import { DeckModel } from "../../model/deck/DeckModel";

export class DeckView implements ViewNode {
	private model = new DeckModel();
	private audio: WaveformAudioDeck = new WaveformAudioDeck();
	private inputChooser = new DeckInputChooser(this.model);
	private playPause = new SwapButton("play", "deck-button");
	
	public constructor() {
		this.model.loadedAudioFile.listen(file => {
			this.audio.load(file);
		});
		
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
