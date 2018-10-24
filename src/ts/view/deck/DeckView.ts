import { DeckInputChooser } from "./DeckInputChooser";
import { ViewNode } from "../ViewNode";
import { SwapButton } from "../widgets/SwapButton";
import { Image } from "../widgets/Image";
import { DeckModel } from "../../model/deck/DeckModel";
import { Label } from "../widgets/Label";
import { appendBreak } from "../ViewUtils";
import { AudioBackend } from "../audio/AudioBackend";
import { HTMLAudio } from "../audio/HTMLAudio";
import { FileDropTarget } from "../dragndrop/FileDropTarget";

export class DeckView implements ViewNode, FileDropTarget {
	private model: DeckModel;
	private audio: AudioBackend & ViewNode = new HTMLAudio(); // TODO: Use WebAudio instead
	private inputChooser: DeckInputChooser;
	private trackName = new Label("No track", "deck-track-name");
	private trackArtist = new Label("No artist", "deck-track-artist");
	private playPause = new SwapButton("play", "deck-button");
	private element: HTMLElement;
	
	public constructor(model: DeckModel, element: HTMLElement) {
		this.element = element;
		this.model = model;
		this.inputChooser = new DeckInputChooser(model);
		this.audio.bind(model);
		
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
		
		element.addEventListener("drop", event => {
			let files = event.dataTransfer.files;
			if (files.length > 0) {
				this.onDrop(files.item(0).path);
			}
		});
		
		this.trackName.placeIn(this.element);
		appendBreak(this.element);
		this.trackArtist.placeIn(this.element);
		appendBreak(this.element);
		appendBreak(this.element);
		this.inputChooser.placeIn(this.element);
		appendBreak(this.element);
		this.playPause.placeIn(this.element);
		this.audio.placeIn(this.element);
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
	
	public onDrop(filePath: string): void {
		this.model.loadedAudioFile.set(filePath);
	}
}
