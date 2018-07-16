import { ViewNode } from "../ViewNode";
import { LibraryModel } from "../../model/library/LibraryModel";
import { LibraryContentsView } from "./LibraryContentsView";
import { LibrarySideBarView } from "./LibrarySideBarView";

export class LibraryView implements ViewNode {
	private sideBar: LibrarySideBarView;
	private contents: LibraryContentsView;
	
	public constructor(model: LibraryModel) {
		this.sideBar = new LibrarySideBarView(model, "library-sidebar");
		this.contents = new LibraryContentsView(model, "library-contents");
	}
	
	public placeIn(parent: HTMLElement): void {
		this.sideBar.placeIn(parent);
		this.contents.placeIn(parent);
	}
}
