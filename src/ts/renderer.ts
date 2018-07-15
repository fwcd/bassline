import { DeckView } from "./view/deck/DeckView";
import { DeckModel } from "./model/deck/DeckModel";
import { WaveformAudioPlayer } from "./view/waveform/WaveformAudioPlayer";
import { CentralFaderPanel } from "./view/fader/CentralFaderPanel";

function createDeckByIndex(index: number): DeckModel {
	let model = new DeckModel();
	let deckElement = document.getElementById("deck" + index);
	let waveformElement = document.getElementById("waveform" + index);
	
	deckElement.addEventListener("mouseover", () => {
		waveformElement.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
	});
	deckElement.addEventListener("mouseout", () => {
		waveformElement.style.backgroundColor = "";
	});
	
	new DeckView(model).placeIn(deckElement);
	new WaveformAudioPlayer(model, waveformElement);
	return model;
}

function rendererMain(): void {
	let decks = [
		createDeckByIndex(0),
		createDeckByIndex(1),
		createDeckByIndex(2),
		createDeckByIndex(3)
	];
	new CentralFaderPanel(decks[0], decks[1], decks[2], decks[3]).placeIn(document.getElementById("centralfaderpanel"));
}

rendererMain();
