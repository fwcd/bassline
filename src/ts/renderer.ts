import { DeckView } from "./view/deck/DeckView";
import { DeckModel } from "./model/deck/DeckModel";
import { Waveform } from "./view/waveform/Waveform";

function createDeckByIndex(index: number): void {
	let model = new DeckModel();
	new DeckView(model).placeIn(document.getElementById("deck" + index));
	new Waveform(model, document.getElementById("waveform" + index));
}

function rendererMain(): void {
	createDeckByIndex(0);
	createDeckByIndex(1);
	createDeckByIndex(2);
	createDeckByIndex(3);
}

rendererMain();
