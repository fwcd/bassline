import { DeckInputChooser } from "./DeckInputChooser";
import { ViewNode } from "../ViewNode";
import { SwapButton } from "../controls/SwapButton";
import { Image } from "../controls/Image";
import { Waveform } from "../waveform/Waveform";
import { DeckModel } from "../../model/deck/DeckModel";

export class DeckView implements ViewNode {
	private model: DeckModel;
	private inputChooser: DeckInputChooser;
	private playPause = new SwapButton("play", "deck-button");
	
	public constructor(model: DeckModel) {
		this.model = model;
		this.inputChooser = new DeckInputChooser(model);
		
		this.playPause.setStates({
			play: {
				node: Image.ofAsset("icons/play.svg", "deck-icon"),
				action: () => { this.model.play(); }
			},
			pause: {
				node: Image.ofAsset("icons/pause.svg", "deck-icon"),
				action: () => { this.model.pause(); }
			}
		});
		model.playing.listen(playing => {
			this.playPause.swap(playing ? "pause" : "play");
		});
	}
	
	public placeIn(parent: HTMLElement): void {
		this.inputChooser.placeIn(parent);
		parent.appendChild(document.createElement("br"));
		this.playPause.placeIn(parent);
	}
}
