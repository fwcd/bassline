import { DeckInputChooser } from "./DeckInputChooser";
import { ViewNode } from "../ViewNode";
import { SwapButton } from "../controls/SwapButton";
import { Image } from "../controls/Image";
import { WaveformAudioPlayer } from "../waveform/WaveformAudioPlayer";
import { DeckModel } from "../../model/deck/DeckModel";
import { Label } from "../controls/Label";
import { appendBreak } from "../viewutils";

export class DeckView implements ViewNode {
	private model: DeckModel;
	private inputChooser: DeckInputChooser;
	private trackName = new Label("No track", "deck-track-name");
	private trackArtist = new Label("No artist", "deck-track-artist");
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
		model.trackInfo.listen(info => {
			this.trackName.setText(info.name);
			this.trackArtist.setText(info.artist);
		});
	}
	
	public placeIn(parent: HTMLElement): void {
		this.trackName.placeIn(parent);
		appendBreak(parent);
		this.trackArtist.placeIn(parent);
		appendBreak(parent);
		appendBreak(parent);
		this.inputChooser.placeIn(parent);
		appendBreak(parent);
		this.playPause.placeIn(parent);
	}
}
