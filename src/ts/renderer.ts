import { DeckView } from "./view/deck/DeckView";
import { DeckModel } from "./model/deck/DeckModel";
import { Waveform } from "./view/waveform/Waveform";

function createDeckByIndex(index: number): void {
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
	new Waveform(model, waveformElement);
}

function rendererMain(): void {
	createDeckByIndex(0);
	createDeckByIndex(1);
	createDeckByIndex(2);
	createDeckByIndex(3);
}

rendererMain();
