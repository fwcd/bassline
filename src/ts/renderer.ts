import { DeckView } from "./view/deck/DeckView";
import { DeckModel } from "./model/deck/DeckModel";
import { CentralFaderPanel } from "./view/fader/CentralFaderPanel";
import { LibraryView } from "./view/library/LibraryView";
import { LibraryModel } from "./model/library/LibraryModel";
import { WaveformView } from "./view/waveform/WaveformView";

function createDeckByIndex(index: number): DeckModel {
	let model = new DeckModel();
	let deckElement = document.getElementById("deck" + index);
	let waveformElement = document.getElementById("waveform" + index);
	
	deckElement.addEventListener("mouseover", () => { model.focused.set(true); });
	deckElement.addEventListener("mouseout", () => { model.focused.set(false); });
	
	new DeckView(model).placeIn(deckElement);
	new WaveformView(model, waveformElement);
	return model;
}

function rendererMain(): void {
	let decks = [
		createDeckByIndex(0),
		createDeckByIndex(1),
		createDeckByIndex(2),
		createDeckByIndex(3)
	];
	new CentralFaderPanel(decks[0], decks[1], decks[2], decks[3])
		.placeIn(document.getElementById("centralfaderpanel"));
	new LibraryView(new LibraryModel())
		.placeIn(document.getElementById("library"));
}

rendererMain();
