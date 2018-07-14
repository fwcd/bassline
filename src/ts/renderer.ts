import { DeckView } from "./view/deck/DeckView";

function createDeckByIndex(index: number): void {
	new DeckView().placeIn(document.getElementById("deck" + index));
}

function rendererMain(): void {
	createDeckByIndex(0);
	createDeckByIndex(1);
	createDeckByIndex(2);
	createDeckByIndex(3);
}

rendererMain();
