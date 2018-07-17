import { DeckInputChooser } from "./DeckInputChooser";
import { ViewNode } from "../ViewNode";
import { SwapButton } from "../widgets/SwapButton";
import { Image } from "../widgets/Image";
import { DeckModel } from "../../model/deck/DeckModel";
import { Label } from "../widgets/Label";
import { appendBreak } from "../viewutils";
import { AudioBackend } from "../audio/AudioBackend";
import { HTMLAudio } from "../audio/HTMLAudio";

export class DeckView implements ViewNode {
	private model: DeckModel;
	private audio: AudioBackend & ViewNode = new HTMLAudio(); // TODO: Use WebAudio instead
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
		model.loadedAudioFile.listen(file => {
			this.audio.load(file);
		});
		model.shouldPlay.listen(shouldPlay => {
			if (shouldPlay) {
				this.audio.play();
			} else {
				this.audio.pause();
			}
			this.model.playing.set(shouldPlay);
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
		this.audio.placeIn(parent);
	}
}
