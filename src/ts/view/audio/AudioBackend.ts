import { DeckModel } from "../../model/deck/DeckModel";

export interface AudioBackend {
	bind(model: DeckModel): void;
}
