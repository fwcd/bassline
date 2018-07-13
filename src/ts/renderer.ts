import { DeckView } from "./view/deck/DeckView";

function createDeckById(id: string): void {
	new DeckView().placeIn(document.getElementById(id));
}

function rendererMain(): void {
	createDeckById("deck0");
	createDeckById("deck1");
	createDeckById("deck2");
	createDeckById("deck3");
}

rendererMain();
