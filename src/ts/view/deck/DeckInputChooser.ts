import { ViewNode } from "../ViewNode";
import { DeckModel } from "../../model/deck/DeckModel";
import { Button } from "../widgets/Button";
import { Label } from "../widgets/Label";
import { remote } from "electron";

export class DeckInputChooser implements ViewNode {
	private button = new Button(new Label("Load"), "deck-button");
	
	public constructor(deckModel: DeckModel) {
		this.button.setAction(() => {
			remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
				properties: ["openFile"]
			}, files => {
				if (files && files.length > 0) {
					deckModel.loadedAudioFile.set(files[0]);
				}
			});
		});
	}
	
	public placeIn(parent: HTMLElement): void {
		this.button.placeIn(parent);
	}
}
