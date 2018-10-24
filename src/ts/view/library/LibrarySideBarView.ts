import { ViewNode } from "../ViewNode";
import { LibraryModel } from "../../model/library/LibraryModel";
import { Button } from "../widgets/Button";
import { Label } from "../widgets/Label";
import { remote } from "electron";
import { appendBreak } from "../ViewUtils";
import { TextField } from "../widgets/TextField";

export class LibrarySideBarView implements ViewNode {
	private element = document.createElement("div");
	
	public constructor(model: LibraryModel, htmlClass?: string) {
		this.element.classList.add(htmlClass);
		
		let searchBar = new TextField("library-searchbar");
		searchBar.setPlaceholder("Search...");
		searchBar.listenToValue(value => {
			model.filter.set(value);
		});
		searchBar.placeIn(this.element);
		
		appendBreak(this.element);
		
		let fileChooser = new Button(new Label("Choose Library Directory"));
		fileChooser.setAction(() => {
			remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
				properties: ["openDirectory"]
			}, files => {
				if (files && files.length > 0) {
					model.rootFolder.set(files[0]);
				}
			});
		});
		fileChooser.placeIn(this.element);
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
